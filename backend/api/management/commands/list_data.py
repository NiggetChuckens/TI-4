from django.conf import settings
from django.core.management.base import BaseCommand
from api.models import Usuario, Gerente, Repartidor, Producto, Pedido, Envio, Notificacion
from prettytable import PrettyTable

class Command(BaseCommand):
    help = 'List all data from the database in a formatted way'

    def handle(self, *args, **kwargs):
        db_name = settings.DATABASES['default']['NAME']
        self.stdout.write(self.style.SUCCESS(f'Database: {db_name}'))
        self.list_data('Usuarios', Usuario, ['ID', 'Nombre', 'Apellido', 'Email'], ['id_usuario', 'nombre', 'apellido', 'email'])
        self.list_data('Gerentes', Gerente, ['ID', 'Nombre', 'Apellido', 'Email', 'Usuario ID'], ['id_gerente', 'nombre', 'apellido', 'email', 'id_usuario.id_usuario'])
        self.list_data('Repartidores', Repartidor, ['ID', 'Nombre', 'Apellido', 'Email', 'Usuario ID'], ['id_repartidor', 'nombre', 'apellido', 'email', 'id_usuario.id_usuario'])
        self.list_data('Productos', Producto, ['ID', 'Nombre', 'Descripcion', 'Peso'], ['id_producto', 'nombre', 'descripcion', 'peso'])
        self.list_data('Pedidos', Pedido, ['ID', 'Fecha Pedido', 'Estado Pedido', 'Producto ID'], ['id_pedido', 'fecha_pedido', 'estado_pedido', 'id_producto.id_producto'])
        self.list_data('Envios', Envio, ['ID', 'Numero Seguimiento', 'Direccion Origen', 'Direccion Destino', 'Fecha Envio', 'Estado Envio', 'Pedido ID', 'Repartidor ID'], ['id_envio', 'numero_seguimiento', 'direccion_origen', 'direccion_destino', 'fecha_envio', 'estado_envio', 'id_pedido.id_pedido', 'id_repartidor.id_repartidor'])
        self.list_data('Notificaciones', Notificacion, ['ID', 'Mensaje', 'Fecha Envio', 'Estado Envio', 'Envio ID', 'Usuario ID'], ['id_notificacion', 'mensaje', 'fecha_envio', 'estado_envio', 'id_envio.id_envio', 'id_usuario.id_usuario'])

    def list_data(self, title, model, headers, fields):
        objects = model.objects.all()
        table = PrettyTable(headers)
        for obj in objects:
            row = [getattr(obj, field.split('.')[0]) if '.' not in field else getattr(getattr(obj, field.split('.')[0]), field.split('.')[1]) for field in fields]
            table.add_row(row)
        self.stdout.write(self.style.SUCCESS(f'{title}:'))
        self.stdout.write(str(table))