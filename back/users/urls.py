from django.urls import path
from .views import Registration_View, Login_View, KakaoLogin_View, Logout_View, KakaoToken_View, FindUser_View
from rest_framework.authtoken.views import obtain_auth_token

app_name = 'users'
urlpatterns = [
    path('register/',Registration_View.as_view(), name='register'),
    path('login/',Login_View.as_view(), name='login'),
    path('logout/',Logout_View.as_view()),
    path('kakao/login/',KakaoLogin_View.as_view()),
    path('kakao/login/token/', KakaoToken_View.as_view(), name='kakao_callback'),
    path('', FindUser_View.as_view()),
]