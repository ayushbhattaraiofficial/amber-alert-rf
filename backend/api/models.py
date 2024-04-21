from datetime import date

from django.contrib.auth.models import User
from django.db import models


class Identification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50)
    chosen_name = models.CharField(max_length=50, blank=True)

    def __str__(self) -> str:
        return f"{self.first_name} {self.middle_name} {self.last_name}"


class Description(models.Model):
    identity = models.ForeignKey(Identification, on_delete=models.CASCADE)
    sex = models.CharField(max_length=6)
    race = models.CharField(max_length=50)
    date_of_birth = models.DateField(blank=True)
    age = models.IntegerField()
    height = models.FloatField()
    weight = models.FloatField()
    distinguishing_characteristics = models.TextField()


class Circumstance(models.Model):
    identity = models.ForeignKey(Identification, on_delete=models.CASCADE)
    missing_since = models.DateField()
    missing_from = models.CharField(max_length=100)
    details_of_disappearance = models.TextField()


class Photo(models.Model):
    identity = models.ForeignKey(Identification, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="image/", null=True)

    def __str__(self) -> str:
        return f"{self.identity} circa {date.today()}"


class Vehicle(models.Model):
    identity = models.ForeignKey(Identification, on_delete=models.CASCADE)
    vehicle_make = models.CharField(max_length=50, blank=True)
    vehicle_model = models.CharField(max_length=50, blank=True)
    vehicle_style = models.CharField(max_length=50, blank=True)
    vehicle_color = models.CharField(max_length=50, blank=True)
    manufacture_year = models.IntegerField(null=True, blank=True)
    registration_state = models.CharField(max_length=50, blank=True)
    vehicle_note = models.TextField(blank=True)


class Contact(models.Model):
    identity = models.ForeignKey(Identification, on_delete=models.CASCADE)
    contact_number = models.BigIntegerField()
    contact_name = models.CharField(max_length=150)
    contact_relation = models.CharField(max_length=50)


class Classification(models.Model):
    identity = models.ForeignKey(Identification, on_delete=models.CASCADE)
    classification = models.CharField(max_length=50)
    is_solved = models.BooleanField()
