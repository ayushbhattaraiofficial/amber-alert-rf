from api.serializers import (
    CircumstanceSerializer,
    DescriptionSerializer,
    IdentificationSerializer,
    PhotoSerializer,
)
from django.test import TestCase
from django.urls import reverse


class PredictTestCase(TestCase):
    def test_predict_success(self):
        url = reverse("predict")
        data = {
            "identification": {"first_name": "John", "last_name": "Doe"},
            "description": {
                "sex": "Male",
                "race": "White",
                "age": 30,
                "height": 180,
                "weight": 75,
            },
            "circumstance": {
                "missing_since": "2024-01-01",
                "missing_from": "New York",
            },
            "photo": {"image": "/path/to/image.jpg"},
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertIn("predicted_class", response.data)

    def test_predict_invalid_data(self):
        url = reverse("predict")
        data = {}  # Invalid data with missing required fields
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, 400)
