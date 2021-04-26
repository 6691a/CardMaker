from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls',namespace='users')),
    path('api/card/', include('card_maker.urls', namespace='card_maker')),

]
