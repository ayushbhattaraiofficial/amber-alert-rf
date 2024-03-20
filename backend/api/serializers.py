from rest_framework import serializers
from .models import Demographics, Circumstances, PhysicalDescription, Clothing, Transportation, Image, Contacts, ClassificationResult
from django.contrib.auth.models import User

class DemographicsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demographics
        fields = '__all__'

class CircumstancesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Circumstances
        fields = '__all__'

class PhysicalDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhysicalDescription
        fields = '__all__'

class ClothingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clothing
        fields = '__all__'

class TransportationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transportation
        fields = '__all__'

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'

class ContactsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contacts
        fields = '__all__'

class ClassificationResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassificationResult
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']
        extra_kwargs = {'password':{'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user