from django.urls import path
from .views import Card_View

app_name='card_maker'

urlpatterns = [
    path('', Card_View.as_view()),

]