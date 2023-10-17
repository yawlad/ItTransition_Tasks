from rest_framework import serializers
from .models import CustomUser


class UserLoginSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'first_name', 'last_name', 'position',
                  'is_blocked', 'last_login')


class UserRegisterSerializer(serializers.ModelSerializer):
    password_repeat = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'first_name', 'last_name', 'position',
                  'is_blocked', 'password', 'password_repeat', 'last_login')
        extra_kwargs = {
            'password': {'write_only': True},
            'is_blocked': {'read_only': True},
            'last_login': {'read_only': True}
        }

    def validate(self, data):
        password = data.get('password')
        password_confirm = data.get('password_repeat')

        if password != password_confirm:
            raise serializers.ValidationError("Passwords do not match.")

        return data

    def create(self, validated_data):
        validated_data.pop('password_repeat')
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)
        user.save()
        return user
