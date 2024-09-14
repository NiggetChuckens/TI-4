from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class Usuario(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nombre', 'apellido']

    def __str__(self):
        return f'{self.nombre} {self.apellido} ({self.email})'

    class Meta:
        db_table = 'usuario'

class Gerente(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, primary_key=True)

    def __str__(self):
        return f'Gerente: {self.usuario}'

    class Meta:
        db_table = 'gerente'

class Repartidor(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, primary_key=True)

    def __str__(self):
        return f'Repartidor: {self.usuario}'

    class Meta:
        db_table = 'repartidor'

class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    peso = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f'{self.nombre} ({self.id})'

    class Meta:
        db_table = 'producto'

class Pedido(models.Model):
    class EstadoPedido(models.TextChoices):
        PENDIENTE = 'pendiente', 'Pendiente'
        PROCESANDO = 'procesando', 'Procesando'
        COMPLETADO = 'completado', 'Completado'
        CANCELADO = 'cancelado', 'Cancelado'

    fecha_pedido = models.DateTimeField(auto_now_add=True)
    estado_pedido = models.CharField(
        max_length=10,
        choices=EstadoPedido.choices,
        default=EstadoPedido.PENDIENTE
    )
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='pedidos')

    def __str__(self):
        return f'Pedido {self.id} - {self.estado_pedido}'

    class Meta:
        db_table = 'pedido'

class Envio(models.Model):
    class EstadoEnvio(models.TextChoices):
        NO_ENVIADO = 'no_enviado', 'No enviado'
        EN_CAMINO = 'en_camino', 'En camino'
        ENTREGADO = 'entregado', 'Entregado'
        NO_ENTREGADO = 'no_entregado', 'No entregado'
        DEVUELTO = 'devuelto', 'Devuelto'

    numero_seguimiento = models.IntegerField(unique=True)
    direccion_origen = models.CharField(max_length=200)
    direccion_destino = models.CharField(max_length=200)
    fecha_envio = models.DateTimeField(auto_now_add=True)
    estado_envio = models.CharField(
        max_length=12,
        choices=EstadoEnvio.choices,
        default=EstadoEnvio.NO_ENVIADO
    )
    pedido = models.OneToOneField(Pedido, on_delete=models.CASCADE, related_name='envio')
    repartidor = models.ForeignKey(Repartidor, on_delete=models.SET_NULL, null=True, related_name='envios')

    def __str__(self):
        return f'Envio {self.numero_seguimiento} - {self.estado_envio}'

    class Meta:
        db_table = 'envio'

class Notificacion(models.Model):
    mensaje = models.TextField()
    fecha_envio = models.DateTimeField(auto_now_add=True)
    estado_envio = models.CharField(
        max_length=12,
        choices=Envio.EstadoEnvio.choices,
        default=Envio.EstadoEnvio.NO_ENVIADO
    )
    envio = models.ForeignKey(Envio, on_delete=models.CASCADE, related_name='notificaciones')
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='notificaciones')

    def __str__(self):
        return f'Notificacion {self.id} - {self.estado_envio}'

    class Meta:
        db_table = 'notificacion'
