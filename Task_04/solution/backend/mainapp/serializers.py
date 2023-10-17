from rest_framework import serializers
from django.contrib.auth import get_user_model

CustomUser = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'first_name', 'last_name',
                  'position', 'is_blocked', 'last_login')


class DeleteUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ()


class BlockUserSerializer(serializers.ModelSerializer):

    new_is_blocked = serializers.BooleanField(required=True)

    class Meta:
        model = CustomUser
        fields = ("new_is_blocked",)

    def update(self, instance, validated_data):
        instance.is_blocked = validated_data["new_is_blocked"]
        instance.save()
        return instance


class UserMeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'first_name', 'last_name',
                  'position', 'is_blocked', 'last_login')
