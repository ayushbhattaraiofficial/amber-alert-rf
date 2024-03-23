from rest_framework import viewsets
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist

from .models import *
from .serializers import *

# ? Do i really have to create details and list views or will a single one really suffice
# TODO: finalize views for the apis
class DemographicsList(viewsets.ModelViewSet):
    queryset = Demographics.objects.all()
    serializer_class = DemographicsSerializer

class CircumstancesList(viewsets.ModelViewSet):
    queryset = Circumstances.objects.all()
    serializer_class = CircumstancesSerializer

class PhysicalDescriptionList(viewsets.ModelViewSet):
    queryset = PhysicalDescription.objects.all()
    serializer_class = PhysicalDescriptionSerializer

class ClothingList(viewsets.ModelViewSet):
    queryset = Clothing.objects.all()
    serializer_class = ClothingSerializer

class TransportationList(viewsets.ModelViewSet):
    queryset = Transportation.objects.all()
    serializer_class = TransportationSerializer

class ContactsList(viewsets.ModelViewSet):
    queryset = Contacts.objects.all()
    serializer_class = ContactsSerializer

class ImageList(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer

class ClassificationResultList(viewsets.ModelViewSet):
    queryset = ClassificationResult.objects.all()
    serializer_class = ClassificationResultSerializer

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


def get_recent_data(request):
    try:
        recent_demographics = Demographics.objects.latest('id')
        recent_circumstances = Circumstances.objects.get(demographic=recent_demographics)
        recent_image = Image.objects.get(demographic=recent_demographics)
        recent_contact = Contacts.objects.get(demographic=recent_demographics)
    except ObjectDoesNotExist:
        return JsonResponse({"error": "No recent data found"}, status=404)

    data = {
        "first_name": recent_demographics.first_name,
        "last_name": recent_demographics.last_name,
        "last_known_location": recent_circumstances.last_known_location,
        "contact": recent_contact.contact_number,
        "image": request.build_absolute_uri(recent_image.image.url)
    }
    return JsonResponse(data)