# Generated by Django 3.2 on 2021-06-06 09:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('card', '0005_alter_card_filename'),
    ]

    operations = [
        migrations.AlterField(
            model_name='card',
            name='email',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
    ]
