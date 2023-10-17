from rest_framework import exceptions
from rest_framework.authentication import TokenAuthentication


class CustomTokenAuthentication(TokenAuthentication):
    def authenticate(self, request):
        token_key = request.COOKIES.get('auth_token')
        if not token_key:
            return None
        try:
            user, token = super().authenticate_credentials(token_key)
            if user and user.is_blocked:
                raise exceptions.AuthenticationFailed('User is blocked')
        except :
            return None

        return user, token
