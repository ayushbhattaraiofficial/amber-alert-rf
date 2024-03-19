from rest_framework import viewsets
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
