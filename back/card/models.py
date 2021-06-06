from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

def upload_to(instance, filename):
    return f'{instance.author}/{datetime.today().strftime("%y-%m")}/{filename}'
    # return '{email}/{date}/{filename}'.format(
    #     email=instance.email,
    #     date=datetime.today().strftime('%y-%m'),
    #     filename=filename)

class Card(models.Model):
    THEME_CHOICES = [
        ('Light', 'Light'),
        ('Dark', 'Dark'),
        ('Colorful','Colorful')
    ]

    author = models.ForeignKey(User, on_delete=models.CASCADE)

    name = models.CharField(max_length=255, db_index=True, blank=True, null=True)
    company = models.CharField(max_length=255, blank=True, null=True)
    theme = models.CharField(max_length=10, choices=THEME_CHOICES, default=THEME_CHOICES[0][0])
    title = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=30, blank=True, null=True)
    message = models.CharField(max_length=255, blank=True, null=True)
    fileURL = models.ImageField(upload_to=upload_to, blank=True, null=True)
    fileName = models.CharField(max_length=25, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated = models.DateTimeField(auto_now=True, blank=True, null=True)

    class Meta:
        db_table = 'card'
        ordering = ['-created']

    