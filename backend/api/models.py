import os
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator

# Some useful constants
SEX_CHOICES = (
    ('MALE', 'Male'),
    ('FEMALE', 'Female'),
    ('OTHER', 'Other'),
    ('UNSURE', 'Unsure'),
)

ETHNICITY_CHOICES = (
    ('CHHETRI', 'Chhetri'),
    ('BRAHMAN', 'Brahman'),
    ('MAGAR', 'Magar'),
    ('THARU', 'Tharu'),
    ('TAMANG', 'Tamang'),
    ('BISHWOKARMA', 'Bishwokarma'),
    ('MUSALMAN', 'Musalman'),
    ('NEWAR', 'Newar'),
    ('YADAV', 'Yadav'),
    ('RAI', 'Rai'),
    ('PARIYAR', 'Pariyar'),
    ('GURUNG', 'Gurung'),
    ('THAKURI', 'Thakuri'),
    ('MIJAR', 'Mijar'),
    ('TELI', 'Teli'),
    ('LIMBU', 'Limbu'),
    ('HARIJAN', 'Harijan'),
    ('KUSHWAHA', 'Kushwaha'),
)

LOCATION_CHOICES = (
    ('BHOJPUR', 'Bhojpur'),
    ('DHANKUTA', 'Dhankuta'),
    ('ILAM', 'Ilam'),
    ('JHAPA', 'Jhapa'),
    ('KHOTANG', 'Khotang'),
    ('MORANG', 'Morang'),
    ('OKHALDHUNGA', 'Okhaldhunga'),
    ('PANCHTHAR', 'Panchthar'),
    ('SANKHUWASABHA', 'Sankhuwasabha'),
    ('SOLUKHUMBU', 'Solukhumbu'),
    ('SUNSARI', 'Sunsari'),
    ('TAPLEJUNG', 'Taplejung'),
    ('TEHRATHUM', 'Tehrathum'),
    ('UDAYAPUR', 'Udayapur'),
    ('PARSA', 'Parsa'),
    ('BARA', 'Bara'),
    ('RAUTAHAT', 'Rautahat'),
    ('SARLAHI', 'Sarlahi'),
    ('DHANUSHA', 'Dhanusha'),
    ('SIRAHA', 'Siraha'),
    ('MAHOKTARI', 'Mahottari'),
    ('SAPTARI', 'Saptari'),
    ('SINDHULI', 'Sindhuli'),
    ('RAMECHHAP', 'Ramechhap'),
    ('DOLKHA', 'Dolakha'),
    ('BHaktapur', 'Bhaktapur'),
    ('DHADING', 'Dhading'),
    ('KATHMANDU', 'Kathmandu'),
    ('KAVREPALANCHOK', 'Kavrepalanchok'),
    ('LAILAPUR', 'Lalitpur'),
    ('NUWAKOT', 'Nuwakot'),
    ('RASUWA', 'Rasuwa'),
    ('SINDHUPALCHOK', 'Sindhupalchok'),
    ('CHITWAN', 'Chitwan'),
    ('MAKWANPUR', 'Makwanpur'),
    ('BAGLUNG', 'Baglung'),
    ('GORKHA', 'Gorkha'),
    ('KASKI', 'Kaski'),
    ('LAMJUNG', 'Lamjung'),
    ('MANANG', 'Manang'),
    ('MUSTANG', 'Mustang'),
    ('MYAGDI', 'Myagdi'),
    ('NAWALPARASI_EAST', 'Nawalparasi East'),
    ('PARBAT', 'Parbat'),
    ('SYANGJA', 'Syangja'),
    ('TANAHUN', 'Tanahun'),
    ('KAPILVASTU', 'Kapilvastu'),
    ('NAWALPARAI_WEST', 'Nawalparai West'),
    ('RUPANDEHI', 'Rupandehi'),
    ('ARGHAKHANCHI', 'Arghakhanchi'),
    ('GULMI', 'Gulmi'),
    ('PALPA', 'Palpa'),
    ('DANI', 'Dang'),
    ('PYUTHAN', 'Pyuthan'),
    ('ROPA', 'Rolpa'),
    ('EASTERN_RUKUM', 'Eastern Rukum'),
    ('BAIKE', 'Baike'),
    ('BARDIYA', 'Bardiya'),
    ('WESTERN_RUKUM', 'Western Rukum'),
    ('SALYAN', 'Salyan'),
    ('DOLPA', 'Dolpa'),
    ('HUMLA', 'Humla'),
    ('JUMLA', 'Jumla'),
    ('KAILALI', 'Kailali'),
    ('ACHAM', 'Achham'),
    ('DOTI', 'Doti'),
    ('BAJHANG', 'Bajhang'),
    ('BAJURA', 'Bajura'),
    ('KANCHANPUR', 'Kanchanpur'),
    ('DADELDHURA', 'Dadeldhura'),
    ('BAITADI', 'Baitadi'),
)

AGGRAVATING_FACTORS_OPTIONS = (
    ('HELP_REQUESTED', 'Help'),
    ('FIGHT_OVERHEARD', 'Fight'),
    ('ACCIDENT_SOUNDS', 'Accident'),
    ('CHILD', 'Child'),
    ('MENTAL_ILLNESS', 'Mental Illness'),
)

HAIR_COLORS = (
    ('BLOND', 'Blond'),
    ('DARK_BROWN', 'Dark Blond'),
    ('MEDIUM_BROWN', 'Medium Brown'),
    ('DARK_BROWN', 'Dark Brown'),
    ('REDDISH_BROWN', 'Reddish Brown'),
    ('RED', 'Red'),
    ('BLACK', 'Black'),
    ('GRAY', 'Gray'),
    ('WHITE', 'White'),
)

EYE_COLORS = (
    ('BROWN', 'Brown'),
    ('BLUE', 'Blue'),
    ('HAZEL', 'Hazel'),
    ('AMBER', 'Amber'),
    ('GRAY', 'Gray'),
    ('GREEN', 'Green'),
)

VEHICLE_STYLE_OPTIONS = (
    ('MICROBUS', 'Microbus'),
    ('MINIBUS', 'Minibus'),
    ('E_RIKSHAW', 'E-Rikshaw'),
    ('BUS', 'Bus'),
    ('TRUCK', 'Truck'),
    ('PICKUP', 'Pickup'),
    ('TRACTOR', 'Tractor'),
    ('TEMPO', 'Tempo'),
    ('CAR', 'Car'),
    ('JEEP', 'Jeep'),
    ('VAN', 'Van'),
    ('MOTORCYCLE', 'Motorcycle'),
)

VEHICLE_COLOR_OPTIONS = (
    ('WHITE', 'White'),
    ('BLACK', 'Black'),
    ('GRAY', 'Gray'),
    ('SILVER', 'Silver'),
    ('BLUE', 'Blue'),
    ('RED', 'Red'),
    ('BROWN', 'Brown'),
    ('GREEN', 'Green'),
    ('ORANGE', 'Orange'),
    ('BEIGE', 'Beige'),
    ('PURPLE', 'Purple'),
    ('GOLD', 'Gold'),
    ('YELLOW', 'Yellow'),
)

VEHICLE_REGISTRATION_STATE_OPTIONS = (
    ('KOSHI', 'Koshi'),
    ('MADHESH', 'Madhesh'),
    ('BAGMATI', 'Bagmati'),
    ('GANDAKI', 'Gandaki'),
    ('LUMBINI', 'Lumbini'),
    ('KARNALI', 'Karnali'),
    ('SUDURPASCHIM', 'Sudurpaschim'),
)

REPORT_CLASS_OPTIONS = (
    ('PANIC', 'Panic'),
    ('WAIT', 'Wait'),
    ('CRITICAL', 'Critical'),
    ('SERIAL', 'Serial'),
)

mobile_number_validator = RegexValidator(regex=r'^9\d{9}$', message='Mobile number must start with 9 and have exactly 10 digits')

# Models based on the NAMUS forms
class Demographics(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    age = models.IntegerField()
    sex = models.CharField(max_length = 6, choices = SEX_CHOICES, default = 'UNSURE')
    ethnicity = models.CharField(max_length = 20, choices = ETHNICITY_CHOICES)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

class Circumstances(models.Model):
    demographic = models.ForeignKey(Demographics, on_delete=models.CASCADE)
    reported_date = models.DateField()
    last_contact_date = models.DateField()
    last_known_location = models.CharField(max_length = 20, choices = LOCATION_CHOICES)
    notes = models.TextField()
    aggravating_factors = models.CharField(max_length = 20, choices = AGGRAVATING_FACTORS_OPTIONS)

    def __str__(self):
        return f'Circumstances of {self.demographic}'


class PhysicalDescription(models.Model):
    demographic = models.ForeignKey(Demographics, on_delete=models.CASCADE)
    hair_color = models.CharField(max_length = 20, choices = HAIR_COLORS)
    hair_description = models.TextField()
    eye_color = models.CharField(max_length = 20, choices = EYE_COLORS)
    eye_description = models.TextField()
    height = models.IntegerField(help_text="Height in centimeters")
    weight = models.FloatField(help_text="Weight in kilograms")
    paralysis = models.BooleanField()

    def __str__(self):
        return f'Physical description of {self.demographic}'

class Clothing(models.Model):
    demographic = models.ForeignKey(Demographics, on_delete=models.CASCADE)
    clothing_description = models.TextField()
    accessories = models.TextField()

class Transportation(models.Model):
    demographic = models.ForeignKey(Demographics, on_delete=models.CASCADE)
    vehicle_manufacturer = models.CharField(max_length = 20)
    vehicle_style = models.CharField(max_length = 20, choices = VEHICLE_STYLE_OPTIONS)
    vehicle_color = models.CharField(max_length = 20, choices = VEHICLE_COLOR_OPTIONS)
    manufacture_year = models.IntegerField()
    registration_state = models.CharField(max_length = 20, choices = VEHICLE_REGISTRATION_STATE_OPTIONS)
    notes = models.TextField()

    def __str__(self):
        return f'Transportation of {self.demographic}'

class Image(models.Model):
    demographic = models.ForeignKey(Demographics, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/', null=True, blank=True)

    def __str__(self):
        return f'Image of {self.demographic}'


class Contacts(models.Model):
    demographic = models.ForeignKey(Demographics, on_delete=models.CASCADE)
    contact_number = models.CharField(validators = [mobile_number_validator], max_length = 10)
    def __str__(self):
        return f'Contact of {self.demographic}'


class ClassificationResult(models.Model):
    demographic = models.ForeignKey(Demographics, on_delete=models.CASCADE)
    predicted_class = models.CharField(choices = REPORT_CLASS_OPTIONS ,max_length = 20)
    is_solved = models.BooleanField()
    def __str__(self):
        return f'Classification of {self.demographic}'
