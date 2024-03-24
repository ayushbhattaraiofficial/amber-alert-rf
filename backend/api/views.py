from rest_framework import viewsets
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse

from .models import *
from .serializers import *

# ? Do i really have to create details and list views or will a single one really suffice
# TODO: finalize views for the apis
class IdentificationsView(viewsets.ModelViewSet):
    queryset = Identifications.objects.all()
    serializer_class = IdentificationsSerializer

class DescriptionsView(viewsets.ModelViewSet):
    queryset = Descriptions.objects.all()
    serializer_class = DescriptionsSerializer

class CircumstancesView(viewsets.ModelViewSet):
    queryset = Circumstances.objects.all()
    serializer_class = CircumstancesSerializer

class LocationsView(viewsets.ModelViewSet):
    queryset = Locations.objects.all()
    serializer_class = LocationsSerializer

class PhysicalDescriptionsView(viewsets.ModelViewSet):
    queryset = PhysicalDescriptions.objects.all()
    serializer_class = PhysicalDescriptionsSerializer

class ClothingsView(viewsets.ModelViewSet):
    queryset = Clothings.objects.all()
    serializer_class = ClothingsSerializer

class TransportsView(viewsets.ModelViewSet):
    queryset = Transports.objects.all()
    serializer_class = TransportsSerializer

class ContactsView(viewsets.ModelViewSet):
    queryset = Contacts.objects.all()
    serializer_class = ContactsSerializer

class ImagesView(viewsets.ModelViewSet):
    queryset = Images.objects.all()
    serializer_class = ImagesSerializer

class ClassificationsView(viewsets.ModelViewSet):
    queryset = Classifications.objects.all()
    serializer_class = ClassificationsSerializer

class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TokenIssuanceView(TokenObtainPairView):
    pass

class TokenRefreshView(APIView):
    def post(self, request):
        refresh_token = request.data.get('refresh')
        if not refresh_token:
            return Response({'error': 'Refresh token is required.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            token = RefreshToken(refresh_token)
            access_token = str(token.access_token)
            return Response({'access': access_token}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


def send_latest_data(request):
    try:
        latest_identification = Identifications.objects.latest('id')
        latest_location = Locations.objects.filter(identification=latest_identification).latest('id')
        latest_image = Images.objects.filter(identification=latest_identification).latest('id')
        latest_contact = Contacts.objects.filter(identification=latest_identification).latest('id')
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'No latest data found.'}, status=404)

    data = {
        "id": latest_identification.id,
        "first_name": latest_identification.first_name,
        "last_name": latest_identification.last_name,
        "chosen_name": latest_identification.chosen_name,
        "city": latest_location.city,
        "state": latest_location.state,
        "contact_number": latest_contact.contact_number,
        "image": latest_image.image.url
    }

def send_case_details(request, id):
    try:
        detail_identification = Identifications.objects.get(id=id)
        detail_description = Descriptions.objects.filter(identification=detail_identification).latest('id')
        detail_circumstance = Circumstances.objects.filter(identification=detail_identification).latest('id')
        detail_location = Locations.objects.filter(identification=detail_identification).latest('id')
        detail_physical_description = PhysicalDescriptions.objects.filter(identification=detail_identification).latest('id')
        detail_clothing = Clothings.objects.filter(identification=detail_identification).latest('id')
        detail_transport = Transports.objects.filter(identification=detail_identification).latest('id')
        detail_image = Images.objects.filter(identification=detail_identification).latest('id')
        detail_contact = Contacts.objects.filter(identification=detail_identification).latest('id')
        detail_classification = Classifications.objects.filter(identification=detail_identification).latest('id')
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'Case not found.'}, status=404)

    data = {
        "id": detail_identification.id,
        "first_name": detail_identification.first_name,
        "last_name": detail_identification.last_name,
        "chosen_name": detail_identification.chosen_name,
        "age": detail_identification.age,
        "biological_sex": detail_description.biological_sex,
        "race_ethnicity": detail_description.race_ethnicity,
        "height": detail_description.height,
        "weight": detail_description.weight,
        "case_date": detail_circumstance.case_date,
        "last_contact_date": detail_circumstance.last_contact_date,
        "circumstances_note": detail_circumstance.circumstances_note,
        "city": detail_location.city,
        "state": detail_location.state,
        "hair_color": detail_physical_description.hair_color,
        "hair_description": detail_physical_description.hair_description,
        "eye_color": detail_physical_description.eye_color,
        "eye_description": detail_physical_description.eye_description,
        "distinctive_physical_features": detail_physical_description.distinctive_physical_features,
        "clothing_description": detail_clothing.clothing_description,
        "vehicle_make": detail_transport.make,
        "vehicle_model": detail_transport.model,
        "vehicle_style": detail_transport.style,
        "vehicle_color": detail_transport.color,
        "vehicle_year": detail_transport.year,
        "vehicle_registration_state": detail_transport.registration_state,
        "vehicle_registration_number": detail_transport.registration_number,
        "vehicle_note": detail_transport.vehicle_note,
        "image": detail_image.image.url,
        "contact_number": detail_contact.contact_number,
        "contact_name": detail_contact.contact_name,
        "contact_relation": detail_contact.contact_relation,
        "predicted_class": detail_classification.predicted_class,
        "is_solved": detail_classification.is_solved
    }

