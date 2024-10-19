from django.db import models

class Ciudad(models.Model):
    id_ciudad = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50, unique=True)

    class Meta:
        db_table = 'ciudad'

class Comuna(models.Model):
    id_comuna = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    id_ciudad = models.ForeignKey(Ciudad, on_delete=models.CASCADE, db_column='id_ciudad')

    class Meta:
        db_table = 'comuna'
        unique_together = ('nombre', 'id_ciudad')

class TipoIncidencia(models.Model):
    id_tipo_incidencia = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100, unique=True)

    class Meta:
        db_table = 'tipo_incidencia'

class EstadoEnvio(models.Model):
    id_estado_envio = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=20, choices=[
        ('pendiente', 'Pendiente'),
        ('en_transito', 'En transito'),
        ('entregado', 'Entregado'),
        ('cancelado', 'Cancelado'),
    ])

    class Meta:
        db_table = 'estado_envio'

class Direccion(models.Model):
    id_direccion = models.AutoField(primary_key=True)
    id_comuna = models.ForeignKey(Comuna, on_delete=models.CASCADE, db_column='id_comuna')
    calle = models.CharField(max_length=100)
    numero = models.IntegerField(null=True, blank=True)

    class Meta:
        db_table = 'direccion'
        unique_together = ('id_comuna', 'calle', 'numero')

class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    email = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=64)
    tipo_usuario = models.CharField(max_length=20, choices=[
        ('cliente', 'Cliente'),
        ('gerente', 'Gerente'),
        ('repartidor', 'Repartidor'),
    ])
    usuario_creado_el = models.DateTimeField()
    usuario_actualizado_el = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'usuario'
        constraints = [
            models.CheckConstraint(check=models.Q(usuario_actualizado_el__isnull=True) | models.Q(usuario_actualizado_el__gt=models.F('usuario_creado_el')), name='usuario_chk_1'),
        ]

class Vehiculo(models.Model):
    id_vehiculo = models.AutoField(primary_key=True)
    matricula = models.CharField(max_length=10, unique=True)
    marca = models.CharField(max_length=100)
    modelo = models.CharField(max_length=100)
    estado = models.CharField(max_length=20, choices=[
        ('disponible', 'Disponible'),
        ('no_disponible', 'No Disponible'),
    ])
    vehiculo_creado_el = models.DateTimeField()
    vehiculo_actualizado_el = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'vehiculo'

class Envio(models.Model):
    id_envio = models.AutoField(primary_key=True)
    id_estado_envio = models.ForeignKey(EstadoEnvio, on_delete=models.CASCADE, db_column='id_estado_envio')
    id_repartidor = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='repartidor_envios', db_column='id_repartidor')
    id_cliente = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='cliente_envios', db_column='id_cliente')
    fecha_pedido_inicio = models.DateTimeField()
    fecha_pedido_fin = models.DateTimeField()
    direccion_origen = models.ForeignKey(Direccion, on_delete=models.CASCADE, related_name='envios_origen', db_column='direccion_origen')
    direccion_destino = models.ForeignKey(Direccion, on_delete=models.CASCADE, related_name='envios_destino', db_column='direccion_destino')
    costo_total = models.IntegerField()

    class Meta:
        db_table = 'envio'
        constraints = [
            models.CheckConstraint(check=models.Q(costo_total__gt=0), name='chk_costo_total'),
            models.CheckConstraint(check=models.Q(fecha_pedido_fin__gt=models.F('fecha_pedido_inicio')), name='envio_chk_1'),
            models.CheckConstraint(check=~models.Q(direccion_origen=models.F('direccion_destino')), name='envio_chk_2'),
        ]

class HistorialAsignacion(models.Model):
    id_historial = models.AutoField(primary_key=True)
    id_repartidor = models.ForeignKey(Usuario, on_delete=models.CASCADE, db_column='id_repartidor')
    id_vehiculo = models.ForeignKey(Vehiculo, on_delete=models.CASCADE, db_column='id_vehiculo')
    fecha_asignacion = models.DateTimeField()
    fecha_devolucion = models.DateTimeField(null=True, blank=True)
    kilometraje_inicial = models.DecimalField(max_digits=10, decimal_places=2)
    kilometraje_final = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    motivo = models.CharField(max_length=100)

    class Meta:
        db_table = 'historial_asignacion'
        constraints = [
            models.CheckConstraint(check=models.Q(fecha_devolucion__isnull=True) | models.Q(fecha_devolucion__gt=models.F('fecha_asignacion')), name='historial_asignacion_chk_1'),
            models.CheckConstraint(check=models.Q(kilometraje_final__isnull=True) | models.Q(kilometraje_final__gte=models.F('kilometraje_inicial')), name='historial_asignacion_chk_2'),
        ]

class HistorialEnvio(models.Model):
    id_historial = models.AutoField(primary_key=True)
    id_envio = models.ForeignKey(Envio, on_delete=models.CASCADE, db_column='id_envio')
    fecha = models.DateTimeField()
    detalles = models.CharField(max_length=200, null=True, blank=True)
    direccion = models.ForeignKey(Direccion, on_delete=models.CASCADE, db_column='direccion')

    class Meta:
        db_table = 'historial_envio'

class Incidencia(models.Model):
    id_incidencia = models.AutoField(primary_key=True)
    id_envio = models.ForeignKey(Envio, on_delete=models.CASCADE, db_column='id_envio')
    fecha = models.DateTimeField()
    id_tipo_incidencia = models.ForeignKey(TipoIncidencia, on_delete=models.CASCADE, db_column='id_tipo_incidencia')
    descripcion = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        db_table = 'incidencia'

class Notificacion(models.Model):
    id_notificacion = models.AutoField(primary_key=True)
    mensaje = models.CharField(max_length=100)
    id_cliente = models.ForeignKey(Usuario, on_delete=models.CASCADE, db_column='id_cliente')
    id_envio = models.ForeignKey(Envio, on_delete=models.CASCADE, db_column='id_envio')
    fecha = models.DateTimeField()

    class Meta:
        db_table = 'notificacion'

class Paquete(models.Model):
    id_paquete = models.AutoField(primary_key=True)
    id_envio = models.ForeignKey(Envio, on_delete=models.CASCADE, db_column='id_envio')
    peso = models.IntegerField()
    largo = models.IntegerField()
    ancho = models.IntegerField()
    alto = models.IntegerField()
    descripcion = models.CharField(max_length=100)

    class Meta:
        db_table = 'paquete'
        constraints = [
            models.CheckConstraint(check=models.Q(peso__gt=0) & models.Q(largo__gt=0) & models.Q(ancho__gt=0) & models.Q(alto__gt=0), name='chk_dimensiones'),
        ]