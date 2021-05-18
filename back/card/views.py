from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from .models import Card
from .serializer import CardSerializer

class Card_View(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
      
        user = Token.objects.get(key=request.auth.key).user

        serializer = CardSerializer(Card.objects.filter(author=user), many=True)

        if serializer:
            print(serializer.data)
            return Response(serializer.data ,status=status.HTTP_200_OK)
       
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    # def post(self, request):
    #     pass

    # # def update(self, request):
    # #     pass
    
    # def delete(self, request):
    #     pass

