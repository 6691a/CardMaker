# Generated by Django 3.2 on 2021-05-17 11:17

import card.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Card',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(db_index=True, max_length=255)),
                ('company', models.CharField(max_length=255)),
                ('theme', models.CharField(choices=[('Light', 'Light'), ('Dark', 'Dark'), ('Colorful', 'Colorful')], default='Light', max_length=10)),
                ('title', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=254)),
                ('message', models.CharField(max_length=255)),
                ('fileName', models.CharField(max_length=255)),
                ('fileURL', models.ImageField(upload_to=card.models.upload_to)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'card',
                'ordering': ['-created'],
            },
        ),
    ]
