from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db import IntegrityError
import logging

logger = logging.getLogger(__name__)

from .models import (
    Usuario, Ciudad, Comuna, TipoIncidencia, EstadoEnvio, Direccion, 
    Vehiculo, Envio, HistorialAsignacion, HistorialEnvio, Incidencia, 
    Notificacion, Paquete
)
from .serializers import (
    UsuarioSerializer, CiudadSerializer, ComunaSerializer, TipoIncidenciaSerializer,
    EstadoEnvioSerializer, DireccionSerializer, VehiculoSerializer, EnvioSerializer,
    HistorialAsignacionSerializer, HistorialEnvioSerializer, IncidenciaSerializer,
    NotificacionSerializer, PaqueteSerializer
)

# Create your views here.

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class CiudadViewSet(viewsets.ModelViewSet):
    queryset = Ciudad.objects.all()
    serializer_class = CiudadSerializer

class ComunaViewSet(viewsets.ModelViewSet):
    queryset = Comuna.objects.all()
    serializer_class = ComunaSerializer

class TipoIncidenciaViewSet(viewsets.ModelViewSet):
    queryset = TipoIncidencia.objects.all()
    serializer_class = TipoIncidenciaSerializer

class EstadoEnvioViewSet(viewsets.ModelViewSet):
    queryset = EstadoEnvio.objects.all()
    serializer_class = EstadoEnvioSerializer

class DireccionViewSet(viewsets.ModelViewSet):
    queryset = Direccion.objects.all()
    serializer_class = DireccionSerializer

class VehiculoViewSet(viewsets.ModelViewSet):
    queryset = Vehiculo.objects.all()
    serializer_class = VehiculoSerializer

class EnvioViewSet(viewsets.ModelViewSet):
    queryset = Envio.objects.all()
    serializer_class = EnvioSerializer

class HistorialAsignacionViewSet(viewsets.ModelViewSet):
    queryset = HistorialAsignacion.objects.all()
    serializer_class = HistorialAsignacionSerializer

class HistorialEnvioViewSet(viewsets.ModelViewSet):
    queryset = HistorialEnvio.objects.all()
    serializer_class = HistorialEnvioSerializer

class IncidenciaViewSet(viewsets.ModelViewSet):
    queryset = Incidencia.objects.all()
    serializer_class = IncidenciaSerializer

class NotificacionViewSet(viewsets.ModelViewSet):
    queryset = Notificacion.objects.all()
    serializer_class = NotificacionSerializer

class PaqueteViewSet(viewsets.ModelViewSet):
    queryset = Paquete.objects.all()
    serializer_class = PaqueteSerializer

@api_view(['POST'])
def register_user(request):
    data = request.data
    try:
        if len(data['password']) < 6:
            return Response({'error': 'La contraseña debe tener al menos 6 caracteres.'}, status=400)
        if len(data['password']) > 64:  # Updated to match the new model's max_length
            return Response({'error': 'La contraseña no debe tener más de 64 caracteres.'}, status=400)
        if data['password'] != data['confirmar_password']:
            return Response({'error': 'Las contraseñas no coinciden.'}, status=400)
        user = Usuario(
            nombre=data['nombre'],
            apellido=data['apellido'],
            email=data['email'],
            password=data['password'],
            tipo_usuario=data['tipo_usuario']
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
        if user.password == data['password']:
            serializer = UsuarioSerializer(user)
            return Response(serializer.data)
        else:
            return Response({'error': 'Credenciales inválidas.'}, status=400)
    except Usuario.DoesNotExist:
        return Response({'error': 'Usuario no encontrado.'}, status=404)
