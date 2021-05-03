import requests
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.response import Response
from django.conf import settings
from django.shortcuts import redirect 
from rest_framework.authtoken.models import Token

from rest_framework.permissions import IsAuthenticated  

from .serializer import RegisterUserSerializer, UserSerializer, LoginSerializer, KakaoRegisterUserSerializer

class FindUser_View(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        print(request.auth.key)
        user = Token.objects.get(key=request.auth.key).user

        serializer = UserSerializer(instance=user)

        if serializer:
            return Response(serializer.data ,status=status.HTTP_200_OK)

        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

        
        
class Registration_View(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterUserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED) 
        
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class Login_View(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        print(request)
        serializer = LoginSerializer(data=request.data)


        if serializer.is_valid():
            return Response(serializer.data ,status=status.HTTP_200_OK)
       
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)

class Logout_View(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        request.user.auth_token.delete()
        return Response({' msg':'삭제'},status=status.HTTP_200_OK)
        
class KakaoLogin_View(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        print(request.data)

        serializer = KakaoRegisterUserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

        token = Login_View.as_view()(request._request)
       
        return Response(status= status.HTTP_400_BAD_REQUEST)

    # def get(self, request):
    #     REST_API_KEY = settings.KAKAO_REST_KEY
    #     REDIRECT_URI = 'http://localhost:8000/api/users/kakao/login/token/'

    #     # REDIRECT_URI = "http://127.0.0.1:8000/api/users/kakao/login/callback/"
    #     return Response({'kakao':f'https://kauth.kakao.com/oauth/authorize?client_id={REST_API_KEY}&redirect_uri={REDIRECT_URI}&response_type=code'},status=status.HTTP_200_OK)
        
    #     # return redirect(
    #     #     f"https://kauth.kakao.com/oauth/authorize?client_id={REST_API_KEY}&redirect_uri={REDIRECT_URI}&response_type=code"
    #     # )
      
class KakaoToken_View(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        REST_API_KEY = settings.KAKAO_REST_KEY
        REDIRECT_URI = 'http://localhost:8000/api/users/kakao/login/token/'
        CODE = request.GET.get("code", None)
        KAKAO_TOKEN_URL = f'https://kauth.kakao.com/oauth/token'

        

        body = {
            'grant_type' : 'authorization_code',
            'client_id' : REST_API_KEY,
            'redirect_uri' : 'http://localhost:8000/api/users/kakao/login/token/',
            'code' : CODE
        }

        response = requests.post(url=KAKAO_TOKEN_URL,data=body).json()

        ACCESS_TOKEN = response.get('access_token')

        KAKAO_USER_URL = "https://kapi.kakao.com/v2/user/me"

        header = {
            "Authorization": f"Bearer {ACCESS_TOKEN}"
        }

        user_response = requests.post(url=KAKAO_USER_URL,headers=header).json()

        # if user_response:
        #     ID = response.get('id')
        #     KAKAO_ACCOUNT = response.get('kakao_account')
        #     NICNAME = KAKAO_ACCOUNT.get('nickname')



        # print(id)
        # print(nicname)

        return Response(user_response, status=status.HTTP_200_OK)
        
