from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from .models import Card
from .serializer import CardSerializer

def getAuthor(request):
    return Token.objects.get(key=request.auth.key).user

class Card_View(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
      
        author = getAuthor(request)

        serializer = CardSerializer(Card.objects.filter(author=author), many=True)

        if serializer:
            return Response(serializer.data ,status=status.HTTP_200_OK)
       
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        author = getAuthor(request)
        card = request.data.get('card')

        # if card is None:
        # serializer = CardSerializer(data=request.data)
        # if serializer.is_valid():
        #     print(serializer)
        return Response(status=status.HTTP_400_BAD_REQUEST)



   
# class Card_Update_View(APIView):

class Card_Delete_View(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):

        author = getAuthor(request)
        cards = request.data.get('id')
 
        if cards is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        Card.objects.filter(pk=cards, author=author).delete()

      
        return Response(status=status.HTTP_200_OK)



