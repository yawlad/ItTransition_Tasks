from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer, DeleteUserSerializer, UserMeSerializer, BlockUserSerializer
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import status

CustomUser = get_user_model()


class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


class DeleteUserView(generics.DestroyAPIView):
    serializer_class = DeleteUserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CustomUser.objects.all()

    def get_object(self):
        user_id = self.kwargs['pk']
        try:
            user = CustomUser.objects.get(id=user_id)
            return user
        except CustomUser.DoesNotExist:
            return None

class BlockUserView(generics.UpdateAPIView):

    queryset = CustomUser.objects.all()
    serializer_class = BlockUserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user_id = self.kwargs['pk']
        try:
            user = CustomUser.objects.get(id=user_id)
            return user
        except CustomUser.DoesNotExist:
            return None
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance is None:
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.serializer_class(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        if not instance.is_blocked:
            return Response({'message': 'User unblocked successfully'}, status=status.HTTP_200_OK)
        return Response({'message': 'User blocked successfully'}, status=status.HTTP_200_OK)


class UserMeView(generics.RetrieveAPIView):
    serializer_class = UserMeSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
