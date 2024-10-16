from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db import IntegrityError
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
    data = request.data
    try:
        if len(data['contraseña']) < 6:
            return Response({'error': 'La contraseña debe tener al menos 6 caracteres.'}, status=400)
        if len(data['contraseña']) > 11529421321504284606846976:
            return Response({'error': 'La contraseña no debe tener más de 11529421321504284606846976 caracteres.'}, status=400)
        if data['contraseña'] != data['confirmar_contraseña']:
            return Response({'error': 'Las contraseñas no coinciden.'}, status=400)
        user = Usuario(
            nombre=data['nombre'],
            apellido=data['apellido'],
            email=data['email'],
            contraseña=data['contraseña']
        )
        user.save()
        serializer = UsuarioSerializer(user)
        return Response(serializer.data)
    except IntegrityError as e:
        logger.error(f"IntegrityError: {e}")
        if '1062' in str(e.args):
            return Response({'error': 'El correo ingresado ya existe.'}, status=400)
        return Response({'error': 'Ocurrió un error.'}, status=500)
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return Response({'error': 'Ocurrió un error inesperado.'}, status=500)

@api_view(['POST'])
def login_user(request):
    data = request.data
    try:
        user = Usuario.objects.get(email=data['email'])
        if user.contraseña == data['contraseña']:
            serializer = UsuarioSerializer(user)
            return Response(serializer.data)
        else:
            return Response({'error': 'Credenciales inválidas.'}, status=400)
    except Usuario.DoesNotExist:
        return Response({'error': 'Usuario no encontrado.'}, status=404)