from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token

class RegisterUserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']
        extra_kwargs = {"password": {"write_only": True}}


    def create(self, validated_data):
        password = self.validated_data['password']
        password2 = self.validated_data['password2']
        user = User.objects.create(
            email = self.validated_data['email'],
            username = self.validated_data['username']
            )
        if password != password2:
            raise serializers.ValidationError({'msg':'password do not match'})
        user.set_password(password)
        user.save()
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=64)
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)
    email = serializers.CharField(max_length=100, read_only=True)
  
    def validate(self, data):
        username = data.get("username", None)
        password = data.get("password", None)

        user = authenticate(username=username, password=password)

        if user is None:
            return {
                'msg': 'check your username or password'
            }

        token =  Token.objects.get_or_create(user=user)
 

        return {
            'email': user.email,
            'username': username,
            'token' : token[0]
        }

    # class Meta:
    #     model = User
    #     fields = ['username', 'password']
    #     extra_kwargs = {"password": {"write_only": True}}




