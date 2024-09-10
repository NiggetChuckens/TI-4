from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db import IntegrityError

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
        if 'UNIQUE constraint failed' in str(e):
            return Response({'error': 'El correo ingresado ya existe.'}, status=400)
        return Response({'error': 'Ocurrió un error.'}, status=500)

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
