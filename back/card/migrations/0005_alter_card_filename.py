# Generated by Django 3.2 on 2021-06-06 08:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('card', '0004_card_filename'),
    ]

    operations = [
        migrations.AlterField(
            model_name='card',
            name='fileName',
            field=models.CharField(blank=True, max_length=25, null=True),
        ),
    ]
