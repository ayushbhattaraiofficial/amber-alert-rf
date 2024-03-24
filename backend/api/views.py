from rest_framework import viewsets
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User

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