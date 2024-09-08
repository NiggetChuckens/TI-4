from django.contrib import admin
from .models import Usuario, Gerente, Repartidor, Producto, Pedido, Envio, Notificacion

# Register your models here.

admin.site.register(Usuario)
admin.site.register(Gerente)
admin.site.register(Repartidor)
admin.site.register(Producto)
admin.site.register(Pedido)
admin.site.register(Envio)
admin.site.register(Notificacion)
