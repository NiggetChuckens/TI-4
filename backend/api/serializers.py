from rest_framework import serializers
from .models import Usuario, Gerente, Repartidor, Producto, Pedido, Envio, Notificacion

class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, min_length=6)

    class Meta:
        model = Usuario
        fields = ['id', 'email', 'nombre', 'apellido', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = Usuario.objects.create_user(**validated_data)
        return user

class GerenteSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer()

    class Meta:
        model = Gerente
        fields = ['usuario']

class RepartidorSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer()

    class Meta:
        model = Repartidor
        fields = ['usuario']

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

class PedidoSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer(read_only=True)
    producto_id = serializers.PrimaryKeyRelatedField(
        queryset=Producto.objects.all(), source='producto', write_only=True
    )

    class Meta:
        model = Pedido
        fields = '__all__'

class EnvioSerializer(serializers.ModelSerializer):
    pedido = PedidoSerializer(read_only=True)
    pedido_id = serializers.PrimaryKeyRelatedField(
        queryset=Pedido.objects.all(), source='pedido', write_only=True
    )
    repartidor = RepartidorSerializer(read_only=True)
    repartidor_id = serializers.PrimaryKeyRelatedField(
        queryset=Repartidor.objects.all(), source='repartidor', write_only=True, required=False
    )

    class Meta:
        model = Envio
        fields = '__all__'

class NotificacionSerializer(serializers.ModelSerializer):
    envio = EnvioSerializer(read_only=True)
    envio_id = serializers.PrimaryKeyRelatedField(
        queryset=Envio.objects.all(), source='envio', write_only=True
    )
    usuario = UsuarioSerializer(read_only=True)
    usuario_id = serializers.PrimaryKeyRelatedField(
        queryset=Usuario.objects.all(), source='usuario', write_only=True
    )

    class Meta:
        model = Notificacion
        fields = '__all__'
