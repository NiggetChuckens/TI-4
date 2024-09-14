from django.contrib.auth.hashers import make_password, check_password
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db import IntegrityError, transaction
import logging

logger = logging.getLogger(__name__)

from .models import Usuario, Gerente, Repartidor, Producto, Pedido, Envio, Notificacion
from .serializers import UsuarioSerializer, GerenteSerializer, RepartidorSerializer, ProductoSerializer, PedidoSerializer, EnvioSerializer, NotificacionSerializer

# Create your views here.

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class GerenteViewSet(viewsets.ModelViewSet):
    queryset = Gerente.objects.all()
    serializer_class = GerenteSerializer

class RepartidorViewSet(viewsets.ModelViewSet):
    queryset = Repartidor.objects.all()
    serializer_class = RepartidorSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer

class EnvioViewSet(viewsets.ModelViewSet):
    queryset = Envio.objects.all()
    serializer_class = EnvioSerializer

class NotificacionViewSet(viewsets.ModelViewSet):
    queryset = Notificacion.objects.all()
    serializer_class = NotificacionSerializer

@api_view(['POST'])
def register_user(request):
    serializer = UsuarioSerializer(data=request.data)
    if serializer.is_valid():
        try:
            with transaction.atomic():
                # Hash the password
                serializer.validated_data['contraseña'] = make_password(serializer.validated_data['contraseña'])
                user = Usuario.objects.create(**serializer.validated_data)
                # Optionally, create associated roles here
            response_serializer = UsuarioSerializer(user)
            return Response(response_serializer.data, status=status.HTTP_201_CREATED)
        except IntegrityError as e:
            if '1062' in str(e.args):
                return Response({'error': 'El correo ingresado ya existe.'}, status=status.HTTP_400_BAD_REQUEST)
            return Response({'error': 'Ocurrió un error.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            logger.error(f"Unexpected error: {e}")
            return Response({'error': 'Ocurrió un error inesperado.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_user(request):
    data = request.data
    email = data.get('email')
    password = data.get('contraseña')

    if not email or not password:
        return Response({'error': 'Email y contraseña son requeridos.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = Usuario.objects.get(email=email)
        if check_password(password, user.contraseña):
            serializer = UsuarioSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Credenciales inválidas.'}, status=status.HTTP_400_BAD_REQUEST)
    except Usuario.DoesNotExist:
        return Response({'error': 'Usuario no encontrado.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return Response({'error': 'Ocurrió un error inesperado.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
