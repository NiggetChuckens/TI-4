from rest_framework import serializers
from .models import (
    Usuario, Ciudad, Comuna, TipoIncidencia, EstadoEnvio, Direccion, 
    Vehiculo, Envio, HistorialAsignacion, HistorialEnvio, Incidencia, 
    Notificacion, Paquete
)

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id_usuario', 'nombre', 'apellido', 'email', 'password', 'tipo_usuario', 'usuario_creado_el', 'usuario_actualizado_el']
        extra_kwargs = {'password': {'write_only': True}}

class CiudadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ciudad
        fields = ['id_ciudad', 'nombre']

class ComunaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comuna
        fields = ['id_comuna', 'nombre', 'id_ciudad']

class TipoIncidenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoIncidencia
        fields = ['id_tipo_incidencia', 'nombre']

class EstadoEnvioSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoEnvio
        fields = ['id_estado_envio', 'nombre']

class DireccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Direccion
        fields = ['id_direccion', 'id_comuna', 'calle', 'numero']

class VehiculoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehiculo
        fields = ['id_vehiculo', 'matricula', 'marca', 'modelo', 'estado', 'vehiculo_creado_el', 'vehiculo_actualizado_el']

class EnvioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Envio
        fields = ['id_envio', 'id_estado_envio', 'id_repartidor', 'id_cliente', 'fecha_pedido_inicio', 'fecha_pedido_fin', 'direccion_origen', 'direccion_destino', 'costo_total']

class HistorialAsignacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistorialAsignacion
        fields = ['id_historial', 'id_repartidor', 'id_vehiculo', 'fecha_asignacion', 'fecha_devolucion', 'kilometraje_inicial', 'kilometraje_final', 'motivo']

class HistorialEnvioSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistorialEnvio
        fields = ['id_historial', 'id_envio', 'fecha', 'detalles', 'direccion']

class IncidenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Incidencia
        fields = ['id_incidencia', 'id_envio', 'fecha', 'id_tipo_incidencia', 'descripcion']

class NotificacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notificacion
        fields = ['id_notificacion', 'mensaje', 'id_cliente', 'id_envio', 'fecha']

class PaqueteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paquete
        fields = ['id_paquete', 'id_envio', 'peso', 'largo', 'ancho', 'alto', 'descripcion']