from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.response import Response
from django.conf import settings

from rest_framework.permissions import IsAuthenticated  

from .serializer import RegisterUserSerializer, UserSerializer, LoginSerializer


class Registration_view(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterUserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED) 
        
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class Login_View(APIView):
    def post(self, request):
       
        serializer = LoginSerializer(data=request.data)

      
        if serializer.is_valid():
            return Response(serializer.data ,status=status.HTTP_200_OK)
       
        msg = {
            "msg": "login error"
        }
        return Response(msg,status= status.HTTP_400_BAD_REQUEST)

class KakaoLogin_View(APIView):
    def get(self, request):
        REST_API_KEY = settings.KAKAO_REST_KEY
        
        return Response(status=status.HTTP_200_OK)
      

class Logout_View(APIView):
    def post(self, request):
        request.user.auth_token.delete()
        return Response({' msg':'삭제'},status=status.HTTP_200_OK)

    