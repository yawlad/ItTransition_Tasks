from django.urls import path, include
from .views import UserListView, DeleteUserView, UserMeView, BlockUserView


urlpatterns = [
    path("auth/", include("authapp.urls"), name=""),
    path('users/', UserListView.as_view(), name="users"),
    path('users/me/', UserMeView.as_view(), name='user_me'),
    path('users/delete/<int:pk>/', DeleteUserView.as_view(), name='delete_user'),
    path('users/block/<int:pk>/', BlockUserView.as_view(), name='block_user')
]
