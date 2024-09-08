from django.core.management.base import BaseCommand
from django.utils import timezone
from api.models import Usuario, Gerente, Repartidor, Producto, Pedido, Envio, Notificacion

class Command(BaseCommand):
    help = 'Populate the database with example data'

    def handle(self, *args, **kwargs):
        # Delete existing data
        Notificacion.objects.all().delete()
        Envio.objects.all().delete()
        Pedido.objects.all().delete()
        Producto.objects.all().delete()
        Repartidor.objects.all().delete()
        Gerente.objects.all().delete()
        Usuario.objects.all().delete()

        # Create example users
        usuario1 = Usuario.objects.create(
            nombre='Alice',
            apellido='Johnson',
            email='alice.johnson@example.com',
            contraseña='securepassword1'
        )
        usuario2 = Usuario.objects.create(
            nombre='Bob',
            apellido='Williams',
            email='bob.williams@example.com',
            contraseña='securepassword2'
        )
        usuario3 = Usuario.objects.create(
            nombre='Charlie',
            apellido='Brown',
            email='charlie.brown@example.com',
            contraseña='securepassword3'
        )

        # Create example gerentes
        gerente1 = Gerente.objects.create(
            id_usuario=usuario1,
            nombre='Alice',
            apellido='Johnson',
            email='alice.johnson@example.com',
            contraseña='securepassword1'
        )
        gerente2 = Gerente.objects.create(
            id_usuario=usuario2,
            nombre='Bob',
            apellido='Williams',
            email='bob.williams@example.com',
            contraseña='securepassword2'
        )
        gerente3 = Gerente.objects.create(
            id_usuario=usuario3,
            nombre='Charlie',
            apellido='Brown',
            email='charlie.brown@example.com',
            contraseña='securepassword3'
        )

        # Create example repartidores
        repartidor1 = Repartidor.objects.create(
            id_usuario=usuario1,
            nombre='Alice',
            apellido='Johnson',
            email='alice.johnson@example.com',
            contraseña='securepassword1'
        )
        repartidor2 = Repartidor.objects.create(
            id_usuario=usuario2,
            nombre='Bob',
            apellido='Williams',
            email='bob.williams@example.com',
            contraseña='securepassword2'
        )
        repartidor3 = Repartidor.objects.create(
            id_usuario=usuario3,
            nombre='Charlie',
            apellido='Brown',
            email='charlie.brown@example.com',
            contraseña='securepassword3'
        )

        # Create example productos
        producto1 = Producto.objects.create(
            nombre='Laptop',
            descripcion='High-end gaming laptop',
            peso=2.5
        )
        producto2 = Producto.objects.create(
            nombre='Smartphone',
            descripcion='Latest model smartphone',
            peso=0.2
        )
        producto3 = Producto.objects.create(
            nombre='Tablet',
            descripcion='10-inch screen tablet',
            peso=0.5
        )

        # Create example pedidos
        pedido1 = Pedido.objects.create(
            fecha_pedido=timezone.now(),
            estado_pedido='pendiente',
            id_producto=producto1
        )
        pedido2 = Pedido.objects.create(
            fecha_pedido=timezone.now(),
            estado_pedido='procesando',
            id_producto=producto2
        )
        pedido3 = Pedido.objects.create(
            fecha_pedido=timezone.now(),
            estado_pedido='completado',
            id_producto=producto3
        )

        # Create example envios
        envio1 = Envio.objects.create(
            numero_seguimiento=789012,
            direccion_origen='1234 Elm Street, Springfield, IL',
            direccion_destino='5678 Oak Avenue, Shelbyville, IL',
            fecha_envio=timezone.now(),
            estado_envio='en_camino',
            id_pedido=pedido1,
            id_repartidor=repartidor1
        )
        envio2 = Envio.objects.create(
            numero_seguimiento=345678,
            direccion_origen='9101 Pine Street, Springfield, IL',
            direccion_destino='1213 Maple Avenue, Shelbyville, IL',
            fecha_envio=timezone.now(),
            estado_envio='entregado',
            id_pedido=pedido2,
            id_repartidor=repartidor2
        )
        envio3 = Envio.objects.create(
            numero_seguimiento=901234,
            direccion_origen='1415 Cedar Street, Springfield, IL',
            direccion_destino='1617 Birch Avenue, Shelbyville, IL',
            fecha_envio=timezone.now(),
            estado_envio='no_entregado',
            id_pedido=pedido3,
            id_repartidor=repartidor3
        )

        # Create example notificaciones
        notificacion1 = Notificacion.objects.create(
            mensaje='Your package is on the way!',
            fecha_envio=timezone.now(),
            estado_envio='en_camino',
            id_envio=envio1,
            id_usuario=usuario1
        )
        notificacion2 = Notificacion.objects.create(
            mensaje='Your package has been delivered!',
            fecha_envio=timezone.now(),
            estado_envio='entregado',
            id_envio=envio2,
            id_usuario=usuario2
        )
        notificacion3 = Notificacion.objects.create(
            mensaje='Your package could not be delivered.',
            fecha_envio=timezone.now(),
            estado_envio='no_entregado',
            id_envio=envio3,
            id_usuario=usuario3
        )

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with example data'))