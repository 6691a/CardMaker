from django.urls import path
from .views import Card_View, Card_Image_Upload_View

app_name='card_maker'

urlpatterns = [
    path('', Card_View.as_view()),
    # path('delete/', Card_Delete_View.as_view()),
    # path('update/', Card_Update_View.as_view()),
    path('image/', Card_Image_Upload_View.as_view()),
]