from rest_framework import serializers
from .models import Identifications, Descriptions, Circumstances, Locations, Clothings, PhysicalDescriptions, Transports, Images, Contacts, Classifications
from django.contrib.auth.models import User

class IdentificationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Identifications
        fields = '__all__'

class  DescriptionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Descriptions
        fields = '__all__'

class CircumstancesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Circumstances
        fields = '__all__'

class LocationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Locations
        fields = '__all__'

class PhysicalDescriptionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhysicalDescriptions
        fields = '__all__'

class ClothingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clothings
        fields = '__all__'

class TransportsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transports
        fields = '__all__'

class ImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Images
        fields = '__all__'

class ContactsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contacts
        fields = '__all__'

class ClassificationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classifications
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'username', 'password', 'is_staff', 'is_superuser']
        extra_kwargs = {'password':{'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user