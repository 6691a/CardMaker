from django.urls import path
from .views import Registration_view

app_name = 'users'
urlpatterns = [
    path('register/',Registration_view.as_view(), name='register'),
]