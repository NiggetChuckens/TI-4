from django.db import models

class Usuario(models.Model):
    id_usuario = models.AutoField(db_column='ID_usuario', primary_key=True)
    nombre = models.CharField(max_length=50, blank=True, null=True)
    apellido = models.CharField(max_length=50, blank=True, null=True)
    email = models.CharField(unique=True, max_length=100, blank=True, null=True)
    contraseña = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f'{self.nombre} {self.apellido} ({self.email})'

    class Meta:
        db_table = 'usuario'

class Gerente(models.Model):
    id_gerente = models.AutoField(db_column='ID_gerente', primary_key=True)
    id_usuario = models.ForeignKey(Usuario, models.DO_NOTHING, db_column='ID_usuario', blank=True, null=True)
    nombre = models.CharField(max_length=50, blank=True, null=True)
    apellido = models.CharField(max_length=50, blank=True, null=True)
    email = models.CharField(unique=True, max_length=100, blank=True, null=True)
    contraseña = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f'{self.nombre} {self.apellido} ({self.email})'

    class Meta:
        db_table = 'gerente'

class Repartidor(models.Model):
    id_repartidor = models.AutoField(db_column='ID_repartidor', primary_key=True)
    id_usuario = models.ForeignKey(Usuario, models.DO_NOTHING, db_column='ID_usuario', blank=True, null=True)
    nombre = models.CharField(max_length=50, blank=True, null=True)
    apellido = models.CharField(max_length=50, blank=True, null=True)
    email = models.CharField(unique=True, max_length=100, blank=True, null=True)
    contraseña = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f'{self.nombre} {self.apellido} ({self.email})'

    class Meta:
        db_table = 'repartidor'

class Producto(models.Model):
    id_producto = models.AutoField(db_column='ID_producto', primary_key=True)
    nombre = models.CharField(max_length=100, blank=True, null=True)
    descripcion = models.TextField(blank=True, null=True)
    peso = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return f'{self.nombre} ({self.id_producto})'

    class Meta:
        db_table = 'producto'

class Pedido(models.Model):
    class EstadoPedido(models.TextChoices):
        PENDIENTE = 'pendiente', 'Pendiente'
        PROCESANDO = 'procesando', 'Procesando'
        COMPLETADO = 'completado', 'Completado'
        CANCELADO = 'cancelado', 'Cancelado'

    id_pedido = models.AutoField(db_column='ID_pedido', primary_key=True)
    fecha_pedido = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    estado_pedido = models.CharField(
        max_length=10,
        choices=EstadoPedido.choices,
        blank=True,
        null=True
    )
    id_producto = models.ForeignKey(Producto, models.DO_NOTHING, db_column='ID_producto', blank=True, null=True)

    def __str__(self):
        return f'Pedido {self.id_pedido} - {self.estado_pedido}'

    class Meta:
        db_table = 'pedido'

class Envio(models.Model):
    class EstadoEnvio(models.TextChoices):
        NO_ENVIADO = 'no_enviado', 'No enviado'
        EN_CAMINO = 'en_camino', 'En camino'
        ENTREGADO = 'entregado', 'Entregado'
        NO_ENTREGADO = 'no_entregado', 'No entregado'
        DEVUELTO = 'devuelto', 'Devuelto'

    id_envio = models.AutoField(db_column='ID_envio', primary_key=True)
    numero_seguimiento = models.IntegerField(blank=True, null=True)
    direccion_origen = models.CharField(max_length=200, blank=True, null=True)
    direccion_destino = models.CharField(max_length=200, blank=True, null=True)
    fecha_envio = models.DateTimeField(blank=True, null=True)
    estado_envio = models.CharField(
        max_length=12,
        choices=EstadoEnvio.choices,
        blank=True,
        null=True
    )
    id_pedido = models.ForeignKey(Pedido, models.DO_NOTHING, db_column='ID_pedido', blank=True, null=True)
    id_repartidor = models.ForeignKey(Repartidor, models.DO_NOTHING, db_column='ID_repartidor', blank=True, null=True)

    def __str__(self):
        return f'Envio {self.numero_seguimiento} - {self.estado_envio}'

    class Meta:
        db_table = 'envio'

class Notificacion(models.Model):
    class EstadoEnvio(models.TextChoices):
        NO_ENVIADO = 'no_enviado', 'No enviado'
        EN_CAMINO = 'en_camino', 'En camino'
        ENTREGADO = 'entregado', 'Entregado'
        NO_ENTREGADO = 'no_entregado', 'No entregado'
        DEVUELTO = 'devuelto', 'Devuelto'

    id_notificacion = models.AutoField(db_column='ID_notificacion', primary_key=True)
    mensaje = models.TextField(blank=True, null=True)
    fecha_envio = models.DateTimeField(blank=True, null=True)
    estado_envio = models.CharField(
        max_length=12,
        choices=EstadoEnvio.choices,
        blank=True,
        null=True
    )
    id_envio = models.ForeignKey(Envio, models.DO_NOTHING, db_column='ID_envio', blank=True, null=True)
    id_usuario = models.ForeignKey(Usuario, models.DO_NOTHING, db_column='ID_usuario', blank=True, null=True)

    def __str__(self):
        return f'Notificacion {self.id_notificacion} - {self.estado_envio}'

    class Meta:
        db_table = 'notificacion'