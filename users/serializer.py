from rest_framework import serializers
from django.contrib.auth.models import User

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
