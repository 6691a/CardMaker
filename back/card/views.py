from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import serializers, status
from .models import Card
from .serializer import CardSerializer, ImageSerializer
import json

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

        if card is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        card['author'] = author.pk

        serializer = CardSerializer(data=card)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        print(request.data)
        data = request.data.get('card')
        author = getAuthor(request)
        
        card = get_object_or_404(Card, pk=data.get('id'))

        serializer = CardSerializer(card, data=data)
        if serializer.is_valid():
            # print(serializer.data)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        author = getAuthor(request)

        cards = request.data.get('cards')

        if cards is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        Card.objects.filter(pk=cards, author=author).delete()

        return Response(status=status.HTTP_200_OK)



class Card_Image_Upload_View(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        print(request.data)
        data = request.data.get('card')
        file = request.data.get('file')
        card = get_object_or_404(Card, pk=data)
        card.fileURL = file
        card.save()

        data = {
            "url" : card.fileURL,
            "name" : file.name
        }
        serializer = ImageSerializer(data=data)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
        

