from django.contrib.auth.models import User
from django.db import models

class Identifications(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50,blank=True)
    last_name = models.CharField(max_length=50)
    chosen_name = models.CharField(max_length=50)
    age = models.IntegerField()

    def __str__(self) -> str:
        return f"{self.first_name} {self.last_name}"

class Descriptions(models.Model):
    identification = models.ForeignKey(Identifications, on_delete=models.CASCADE)
    biological_sex = models.CharField(max_length=15)
    race_ethnicity = models.CharField(max_length=70)
    height = models.DecimalField(max_digits=5, decimal_places=2)
    weight = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self) -> str:
        return f"Description of {self.identification}"

class Circumstances(models.Model):
    identification = models.ForeignKey(Identifications, on_delete=models.CASCADE)
    case_date = models.DateField()
    last_contact_date = models.DateField()
    circumstances_note = models.TextField()

    def __str__(self) -> str:
        return f"Circumstances of {self.identification}"

class Locations(models.Model):
    identification = models.ForeignKey(Identifications, on_delete=models.CASCADE)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)

    def __str__(self) -> str:
        return f"Location of {self.identification}"

class PhysicalDescriptions(models.Model):
    identification = models.ForeignKey(Identifications, on_delete=models.CASCADE)
    hair_color = models.CharField(max_length=50)
    hair_description = models.TextField()
    eye_color = models.CharField(max_length=50)
    eye_description = models.TextField()
    distinctive_physical_features = models.TextField()

    def __str__(self) -> str:
        return f"Physical description of {self.identification}"

class Clothings(models.Model):
    identification = models.ForeignKey(Identifications, on_delete=models.CASCADE)
    clothing_description = models.TextField()

    def __str__(self) -> str:
        return f"Clothing of {self.identification}"

class Transports(models.Model):
    identification = models.ForeignKey(Identifications, on_delete=models.CASCADE)
    make = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    style = models.CharField(max_length=50)
    color = models.CharField(max_length=50)
    year = models.IntegerField()
    registration_state = models.CharField(max_length=50)
    registration_number = models.CharField(max_length=50)
    vehicle_note = models.TextField()

    def __str__(self) -> str:
        return f"Transportation of {self.identification}"

class Images(models.Model):
    identification = models.ForeignKey(Identifications, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/')

    def __str__(self) -> str:
        return f"Image of {self.identification}"

class Contacts(models.Model):
    identification = models.ForeignKey(Identifications, on_delete=models.CASCADE)
    contact_number = models.CharField(max_length=10)
    contact_name = models.CharField(max_length=100)
    contact_relation = models.CharField(max_length=50)

    def __str__(self) -> str:
        return f"Contact of {self.identification}"

class Classifications(models.Model):
    identification = models.ForeignKey(Identifications, on_delete=models.CASCADE)
    predicted_class = models.CharField(max_length=50)
    is_solved = models.BooleanField()

    def __str__(self) -> str:
        return f"Classification of {self.identification}"