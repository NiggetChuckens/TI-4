from rest_framework import serializers
from .models import Usuario, Gerente, Repartidor, Producto, Pedido, Envio, Notificacion

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id_usuario', 'nombre', 'apellido', 'email', 'contraseña']

class GerenteSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer()

    class Meta:
        model = Gerente
        fields = ['id', 'usuario']

class RepartidorSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer()

    class Meta:
        model = Repartidor
        fields = ['id', 'usuario']

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['id', 'nombre', 'descripcion', 'peso']

class PedidoSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer()

    class Meta:
        model = Pedido
        fields = ['id', 'fecha_pedido', 'estado_pedido', 'producto']

class EnvioSerializer(serializers.ModelSerializer):
    pedido = PedidoSerializer()
    repartidor = RepartidorSerializer()

    class Meta:
        model = Envio
        fields = ['id', 'numero_seguimiento', 'direccion_origen', 'direccion_destino', 'fecha_envio', 'estado_envio', 'pedido', 'repartidor']

class NotificacionSerializer(serializers.ModelSerializer):
    envio = EnvioSerializer()
    usuario = UsuarioSerializer()

    class Meta:
        model = Notificacion
        fields = ['id', 'mensaje', 'fecha_envio', 'estado_envio', 'envio', 'usuario']