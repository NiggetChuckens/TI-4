from django.core.management.base import BaseCommand
from api.models import Usuario, Gerente, Repartidor, Producto, Pedido, Envio, Notificacion

class Command(BaseCommand):
    help = 'Delete all data from the database'

    def handle(self, *args, **kwargs):
        Notificacion.objects.all().delete()
        Envio.objects.all().delete()
        Pedido.objects.all().delete()
        Producto.objects.all().delete()
        Repartidor.objects.all().delete()
        Gerente.objects.all().delete()
        Usuario.objects.all().delete()

        self.stdout.write(self.style.SUCCESS('Successfully deleted all data from the database'))