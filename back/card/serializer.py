from rest_framework import serializers
from .models import Card

class CardSerializer(serializers.ModelSerializer):
    fileURL = serializers.ImageField(required=False)
    class Meta:
        model = Card
        fields = ['id','author','name','company','theme','title','email','message','fileURL','fileName']
        # extra_kwargs = {'fileURL': {'write_only': True}}


class ImageSerializer(serializers.Serializer):
    name = serializers.CharField()
    url = serializers.ImageField() 


class ImageCardCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['id','author','name','company','theme','title','email','message','fileURL','fileName']