from django.test import TestCase
from django.contrib.auth.models import User
from api.models import Demographics, PhysicalDescription, Circumstances, Clothing, Transportation, Image, Contacts, ClassificationResult
from datetime import date

class TestModels(TestCase):
    def test_models_creation(self):
        # Create a user for the demographics model
        user = User.objects.create(username='test_user')

        # Create demographics instance
        demographics = Demographics.objects.create(
            user=user,
            first_name='John',
            last_name='Doe',
            age=23,
            sex='MALE',
            ethnicity='WHITE'
        )

        # Create physical description instance
        physical_description = PhysicalDescription.objects.create(
            demographic=demographics,
            hair_color='BLOND',
            hair_description='wavy',
            eye_color='GREEN',
            eye_description='circular',
            height=170,
            weight=70.5,
            paralysis=False
        )

        # Create circumstances instance
        circumstances = Circumstances.objects.create(
            demographic=demographics,
            reported_date=date(2024, 3, 19),
            last_contact_date=date(2024, 3, 18),
            last_known_location='KATHMANDU',
            notes='Test notes',
            aggravating_factors='HELP_REQUESTED'
        )

        # Create clothing instance
        clothing = Clothing.objects.create(
            demographic=demographics,
            clothing_description='Test clothing description',
            accessories='Test accessories'
        )

        # Create transportation instance
        transportation = Transportation.objects.create(
            demographic=demographics,
            vehicle_manufacturer='Test manufacturer',
            vehicle_style='CAR',
            vehicle_color='BLACK',
            manufacture_year=2022,
            registration_state='BAGMATI',
            notes='Test transportation notes'
        )

        # Create image instance
        image = Image.objects.create(
            demographic=demographics,
            image='test_image.jpg'
        )

        # Create contacts instance
        contacts = Contacts.objects.create(
            demographic=demographics,
            contact_number='9876543210'
        )

        # Create classification result instance
        classification_result = ClassificationResult.objects.create(
            demographic=demographics,
            predicted_class='PANIC',
            is_solved=False
        )

        # Assertions
        self.assertEqual(demographics.first_name, 'John')
        self.assertEqual(physical_description.hair_color, 'BLOND')
        self.assertEqual(circumstances.last_known_location, 'KATHMANDU')
        self.assertEqual(clothing.accessories, 'Test accessories')
        self.assertEqual(transportation.vehicle_color, 'BLACK')
        self.assertEqual(image.image, 'test_image.jpg')
        self.assertEqual(contacts.contact_number, '9876543210')
        self.assertEqual(classification_result.predicted_class, 'PANIC')
        self.assertEqual(classification_result.is_solved, False)
