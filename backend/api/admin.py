from django.contrib import admin
from .models import (
    Usuario, 
    Ciudad, 
    Comuna, 
    TipoIncidencia, 
    EstadoEnvio, 
    Direccion, 
    Vehiculo, 
    Envio, 
    HistorialAsignacion, 
    HistorialEnvio, 
    Incidencia, 
    Notificacion, 
    Paquete
)

# Register your models here.
admin.site.register(Usuario)
admin.site.register(Ciudad)
admin.site.register(Comuna)
admin.site.register(TipoIncidencia)
admin.site.register(EstadoEnvio)
admin.site.register(Direccion)
admin.site.register(Vehiculo)
admin.site.register(Envio)
admin.site.register(HistorialAsignacion)
admin.site.register(HistorialEnvio)
admin.site.register(Incidencia)
admin.site.register(Notificacion)
admin.site.register(Paquete)