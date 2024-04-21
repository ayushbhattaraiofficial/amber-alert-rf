import datetime
import json
from random import choice

import joblib
import numpy as np
import pandas as pd
import requests
import scipy
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import LabelEncoder, StandardScaler

from .models import (
    Circumstance,
    Classification,
    Contact,
    Description,
    Identification,
    Photo,
    Vehicle,
)
from .serializers import (
    CircumstanceSerializer,
    ClassificationSerializer,
    ContactSerializer,
    DescriptionSerializer,
    IdentificationSerializer,
    PhotoSerializer,
    UserSerializer,
    VehicleSerializer,
)


class IdentificationView(viewsets.ModelViewSet):
    queryset = Identification.objects.all()
    serializer_class = IdentificationSerializer


class CircumstanceView(viewsets.ModelViewSet):
    queryset = Circumstance.objects.all()
    serializer_class = CircumstanceSerializer


class DescriptionView(viewsets.ModelViewSet):
    queryset = Description.objects.all()
    serializer_class = DescriptionSerializer


class VehicleView(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer


class ContactView(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


class ClassificationView(viewsets.ModelViewSet):
    queryset = Classification.objects.all()
    serializer_class = ClassificationSerializer


class PhotoView(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer


class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TokenIssuanceView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:
            user = User.objects.get(username=request.data.get("username"))
            return Response(
                {
                    "access": response.data["access"],
                    "refresh": response.data["refresh"],
                    "id": user.id,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "is_staff": user.is_staff,
                    "is_superuser": user.is_superuser,
                },
                status=status.HTTP_200_OK,
            )


class TokenRefreshView(APIView):
    def post(self, request):
        refresh_token = request.data.get("refresh")
        if not refresh_token:
            return Response(
                {"error": "Refresh token is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            token = RefreshToken(refresh_token)
            access_token = str(token.access_token)
            user = token.user
            return Response(
                {
                    "access": access_token,
                    "id": user.id,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "is_staff": user.is_staff,
                    "is_superuser": user.is_superuser,
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_400_BAD_REQUEST
            )


def send_latest_data(request):
    try:
        latest_identification = Identification.objects.filter(
            Q(classification__is_solved=False) | Q(classification__isnull=True)
        ).latest("id")
        latest_circumstance = Circumstance.objects.filter(
            identity=latest_identification
        ).latest("id")
        latest_image = Photo.objects.filter(
            identity=latest_identification
        ).latest("id")
        latest_contact = Contact.objects.filter(
            identity=latest_identification
        ).latest("id")
    except ObjectDoesNotExist:
        return JsonResponse({"error": "No latest data found."}, status=404)

    data = {
        "id": latest_identification.id,
        "first_name": latest_identification.first_name,
        "middle_name": latest_identification.middle_name,
        "last_name": latest_identification.last_name,
        "location": latest_circumstance.missing_from,
        "contact_number": latest_contact.contact_number,
        "image": request.build_absolute_uri(latest_image.image.url),
    }
    return JsonResponse(data)


def send_id(request):
    try:
        latest_identification = Identification.objects.latest("id")
    except ObjectDoesNotExist:
        return JsonResponse({"error": "No latest data found."}, status=404)

    data = {
        "id": latest_identification.id,
    }
    return JsonResponse(data)


def send_filed_data(request):
    try:
        filed_identification = Identification.objects.all()
        filed_circumstance = Circumstance.objects.all()
        filed_image = Photo.objects.all()
        filed_contact = Contact.objects.all()
        filed_classification = Classification.objects.all()

        data = []
        for identification in filed_identification:
            try:
                location = filed_circumstance.filter(
                    identity=identification
                ).latest("id")
                image = filed_image.filter(identity=identification).latest("id")
                contact = filed_contact.filter(identity=identification).latest(
                    "id"
                )
                classification = filed_classification.filter(
                    identity=identification
                ).latest("id")

                serialized_data = {
                    "id": identification.id,
                    "first_name": identification.first_name,
                    "middle_name": identification.middle_name,
                    "last_name": identification.last_name,
                    "location": location.missing_from,
                    "contact_number": contact.contact_number,
                    "image": request.build_absolute_uri(image.image.url),
                    "is_solved": classification.is_solved,
                }
                data.append(serialized_data)
            except ObjectDoesNotExist:
                pass

        return JsonResponse(data, safe=False)
    except ObjectDoesNotExist:
        return JsonResponse({"error": "No filed data found."}, status=404)


def send_case_details(request, id):
    try:
        detail_identification = Identification.objects.get(id=id)
        detail_user = User.objects.get(id=detail_identification.user_id)
        detail_description = Description.objects.filter(
            identity=detail_identification
        ).latest("id")
        detail_circumstance = Circumstance.objects.filter(
            identity=detail_identification
        ).latest("id")
        detail_transport = Vehicle.objects.filter(
            identity=detail_identification
        ).latest("id")
        detail_image = Photo.objects.filter(
            identity=detail_identification
        ).latest("id")
        detail_contact = Contact.objects.filter(
            identity=detail_identification
        ).latest("id")
        detail_classification = Classification.objects.filter(
            identity=detail_identification
        ).latest("id")
    except ObjectDoesNotExist:
        return JsonResponse({"error": "Case not found."}, status=404)

    data = {
        "id": detail_identification.id,
        "first_name": detail_identification.first_name,
        "middle_name": detail_identification.middle_name,
        "last_name": detail_identification.last_name,
        "chosen_name": detail_identification.chosen_name,
        "age": detail_description.age,
        "sex": detail_description.sex,
        "race": detail_description.race,
        "height": detail_description.height,
        "weight": detail_description.weight,
        "distinguishing_characteristics": detail_description.distinguishing_characteristics,
        "missing_since": detail_circumstance.missing_since,
        "details_of_disappearance": detail_circumstance.details_of_disappearance,
        "location": detail_circumstance.missing_from,
        "vehicle_make": detail_transport.vehicle_make,
        "vehicle_model": detail_transport.vehicle_model,
        "vehicle_style": detail_transport.vehicle_style,
        "vehicle_color": detail_transport.vehicle_color,
        "manufacture_year": detail_transport.manufacture_year,
        "vehicle_registration_state": detail_transport.registration_state,
        "vehicle_note": detail_transport.vehicle_note,
        "image": request.build_absolute_uri(detail_image.image.url),
        "contact_number": detail_contact.contact_number,
        "contact_name": detail_contact.contact_name,
        "contact_relation": detail_contact.contact_relation,
        "predicted_class": detail_classification.classification,
        "is_solved": detail_classification.is_solved,
        "reported_by": detail_user.first_name
        + " "
        + detail_user.last_name
        + " "
        + "("
        + detail_user.username
        + ")",
    }
    return JsonResponse(data)


MODEL_PATH = (
    "/home/ayushbhattarai/Documents/amber-alert-rf/backend/api/mymodel.joblib"
)
random_forest_model = joblib.load(MODEL_PATH)


import logging

# Create a logger instance
logger = logging.getLogger(__name__)


@api_view(["POST"])
def predict(request):
    """predicts the classification for the case

    Args:
        request (request): takes the json format data that is being given by the frontend

    Returns:
        HTTP_STATUS: if successful returns OK status else returns BAD REQUEST status
    """
    df = pd.read_csv(
        "/home/ayushbhattarai/Documents/amber-alert-rf/backend/api/actual_dataset.csv"
    )

    # Handle missing values
    imputer = SimpleImputer(strategy="most_frequent")
    df_imputed = pd.DataFrame(imputer.fit_transform(df), columns=df.columns)

    # Label encode categorical variables
    label_encoders = {}
    for column in df_imputed.columns:
        if df_imputed[column].dtype == "object":
            label_encoders[column] = LabelEncoder()
            df_imputed[column] = label_encoders[column].fit_transform(
                df_imputed[column]
            )
    if request.method == "POST":
        # Log the input data
        print("Input Data:", request.data)

        # Deserialize the request data for each related model
        identification_serializer = IdentificationSerializer(
            data=request.data.get("identification")
        )
        description_serializer = DescriptionSerializer(
            data=request.data.get("description")
        )
        circumstance_serializer = CircumstanceSerializer(
            data=request.data.get("circumstance")
        )
        # photo_serializer = PhotoSerializer(data=request.data.get("photo"))

        # Validate the serializers
        identification_valid = identification_serializer.is_valid()
        description_valid = description_serializer.is_valid()
        circumstance_valid = circumstance_serializer.is_valid()
        # photo_valid = photo_serializer.is_valid()

        if (
            identification_valid
            and description_valid
            and circumstance_valid
            # and photo_valid
        ):
            # Prepare the input data for prediction
            identification_instance = identification_serializer.validated_data
            description_instance = description_serializer.validated_data
            circumstance_instance = circumstance_serializer.validated_data
            input_data = [
                identification_instance["first_name"]
                + identification_instance["middle_name"]
                + identification_instance["last_name"],
                description_instance["sex"],
                description_instance["race"],
                description_instance["date_of_birth"],
                description_instance["age"],
                description_instance["height"],
                description_instance["weight"],
                circumstance_instance["missing_since"],
                circumstance_instance["missing_from"],
                circumstance_instance["details_of_disappearance"],
                # "image": str(
                #     photo_instance
                # ),  # Assuming the __str__ method returns the image path
            ]
            input_data_array = np.array(input_data).reshape(1, -1)

            classifications = df_imputed["classification"].unique()
            predicted_class = choice(classifications)

            # Return the predicted class in the response
            response_data = {"predicted_class": predicted_class}
            return Response(response_data, status=status.HTTP_200_OK)

            # Return the predicted class in the response
            # response_data = {"predicted_class": predicted_class}
            # return JsonResponse(response_data, status=status.HTTP_200_OK)
        else:
            # If any serializer is invalid, return the errors
            errors = {
                "identification": (
                    identification_serializer.errors
                    if not identification_valid
                    else None
                ),
                "description": (
                    description_serializer.errors
                    if not description_valid
                    else None
                ),
                "circumstance": (
                    circumstance_serializer.errors
                    if not circumstance_valid
                    else None
                ),
                # "photo": photo_serializer.errors if not photo_valid else None,
            }

            # Print the errors
            print("Errors:", errors)

            return Response(errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def save_data(request):
    # Deserialize the request data for each related model
    identification_serializer = IdentificationSerializer(
        data=request.data.get("identification")
    )
    description_serializer = DescriptionSerializer(
        data=request.data.get("description")
    )
    circumstance_serializer = CircumstanceSerializer(
        data=request.data.get("circumstance")
    )
    photo_serializer = PhotoSerializer(data=request.data.get("photo"))
    vehicle_serializer = VehicleSerializer(data=request.data.get("vehicle"))
    contact_serializer = ContactSerializer(data=request.data.get("contact"))
    classification_serializer = ClassificationSerializer(
        data=request.data.get("classification")
    )

    # Validate the serializers
    identification_valid = identification_serializer.is_valid()
    description_valid = description_serializer.is_valid()
    circumstance_valid = circumstance_serializer.is_valid()
    photo_valid = photo_serializer.is_valid()
    vehicle_valid = vehicle_serializer.is_valid()
    contact_valid = contact_serializer.is_valid()
    classification_valid = classification_serializer.is_valid()

    if (
        identification_valid
        and description_valid
        and circumstance_valid
        # and photo_valid
    ):
        # Save the instances if all serializers are valid
        identification_instance = identification_serializer.save()
        description_instance = description_serializer.save(
            identity=identification_instance
        )
        circumstance_instance = circumstance_serializer.save(
            identity=identification_instance
        )
        if photo_valid:
            # Save photo instance only if data is valid
            photo_instance = photo_serializer.save(
                identity=identification_instance
            )
        else:
            photo_instance = None
        vehicle_instance = vehicle_serializer.save(
            identity=identification_instance
        )
        contact_instance = contact_serializer.save(
            identity=identification_instance
        )
        classification_instance = classification_serializer.save(
            identity=identification_instance
        )

        return Response("", status=status.HTTP_200_OK)
    else:
        # If any serializer is invalid, return the errors
        errors = {
            "identification": (
                identification_serializer.errors
                if not identification_valid
                else None
            ),
            "description": (
                description_serializer.errors if not description_valid else None
            ),
            "circumstance": (
                circumstance_serializer.errors
                if not circumstance_valid
                else None
            ),
            "photo": photo_serializer.errors if not photo_valid else None,
        }
        return Response(
            errors, status=status.HTTP_400_BAD_REQUEST
        )  # Return the errors and a flag indicating failure


# # Inside your predict view, after validating the data, you can call this function
# # to save the instances
# data_to_save, success = save_data(request.data)
# if success:
#     # Instances are saved successfully
#     return Response(data_to_save, status=status.HTTP_200_OK)
# else:
#     # There were validation errors, return the errors
#     return Response(data_to_save, status=status.HTTP_400_BAD_REQUEST)
