# backend/api/view/login_view.py

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework import status

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
        # Determine user type (you may need to adjust this based on your user model)
        user_type = 'admin' if user.is_staff else 'regular'

        return Response({
            'valid': True,
            'user_type': user_type
        })
    else:
        return Response({
            'valid': False
        }, status=status.HTTP_401_UNAUTHORIZED)