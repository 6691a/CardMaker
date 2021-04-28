from django.urls import path
from .views import Registration_view, Login_View, KakaoLogin_View, Logout_View, KakaoToken_View
from rest_framework.authtoken.views import obtain_auth_token

app_name = 'users'
urlpatterns = [
    path('register/',Registration_view.as_view(), name='register'),
    path('login/',Login_View.as_view(), name='login'),
    path('logout/',Logout_View.as_view()),
    path('kakao/login/',KakaoLogin_View.as_view()),
    path('kakao/login/token/', KakaoToken_View.as_view(), name='kakao_callback'),

]