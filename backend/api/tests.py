import logging
from django.test import TestCase
from django.core.management import call_command
from django.utils import timezone
from .models import Usuario, Gerente, Repartidor, Producto, Pedido, Envio, Notificacion

logger = logging.getLogger(__name__)

class BaseModelTest(TestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        call_command('migrate', verbosity=0, interactive=False)

class UsuarioModelTest(BaseModelTest):
    def setUp(self):
        logger.info("Setting up UsuarioModelTest")
        self.usuario = Usuario.objects.create(
            nombre='Test',
            apellido='User',
            email='testuser@example.com',
            contraseña='password123'
        )
        logger.info(f"Created Usuario: {self.usuario}")

    def test_usuario_creation(self):
        logger.info("Testing Usuario creation")
        self.assertEqual(self.usuario.nombre, 'Test')
        self.assertEqual(self.usuario.apellido, 'User')
        self.assertEqual(self.usuario.email, 'testuser@example.com')
        self.assertEqual(self.usuario.contraseña, 'password123')
        logger.info("Usuario creation test passed")

class GerenteModelTest(BaseModelTest):
    def setUp(self):
        logger.info("Setting up GerenteModelTest")
        self.usuario = Usuario.objects.create(
            nombre='Gerente',
            apellido='User',
            email='gerenteuser@example.com',
            contraseña='password123'
        )
        self.gerente = Gerente.objects.create(
            id_usuario=self.usuario,
            nombre='Gerente',
            apellido='User',
            email='gerenteuser@example.com',
            contraseña='password123'
        )
        logger.info(f"Created Gerente: {self.gerente}")

    def test_gerente_creation(self):
        logger.info("Testing Gerente creation")
        self.assertEqual(self.gerente.nombre, 'Gerente')
        self.assertEqual(self.gerente.apellido, 'User')
        self.assertEqual(self.gerente.email, 'gerenteuser@example.com')
        self.assertEqual(self.gerente.contraseña, 'password123')
        logger.info("Gerente creation test passed")

class ProductoModelTest(BaseModelTest):
    def setUp(self):
        logger.info("Setting up ProductoModelTest")
        self.producto = Producto.objects.create(
            nombre='Producto1',
            descripcion='Descripcion del producto 1',
            peso=1.5
        )
        logger.info(f"Created Producto: {self.producto}")

    def test_producto_creation(self):
        logger.info("Testing Producto creation")
        self.assertEqual(self.producto.nombre, 'Producto1')
        self.assertEqual(self.producto.descripcion, 'Descripcion del producto 1')
        self.assertEqual(self.producto.peso, 1.5)
        logger.info("Producto creation test passed")

class PedidoModelTest(BaseModelTest):
    def setUp(self):
        logger.info("Setting up PedidoModelTest")
        self.producto = Producto.objects.create(
            nombre='Producto1',
            descripcion='Descripcion del producto 1',
            peso=1.5
        )
        self.pedido = Pedido.objects.create(
            fecha_pedido=timezone.make_aware(timezone.datetime(2023, 10, 1, 12, 0, 0)),
            estado_pedido='pendiente',
            id_producto=self.producto
        )
        logger.info(f"Created Pedido: {self.pedido}")

    def test_pedido_creation(self):
        logger.info("Testing Pedido creation")
        self.assertEqual(self.pedido.estado_pedido, 'pendiente')
        self.assertEqual(self.pedido.id_producto, self.producto)
        logger.info("Pedido creation test passed")

class EnvioModelTest(BaseModelTest):
    def setUp(self):
        logger.info("Setting up EnvioModelTest")
        self.producto = Producto.objects.create(
            nombre='Producto1',
            descripcion='Descripcion del producto 1',
            peso=1.5
        )
        self.pedido = Pedido.objects.create(
            fecha_pedido=timezone.make_aware(timezone.datetime(2023, 10, 1, 12, 0, 0)),
            estado_pedido='pendiente',
            id_producto=self.producto
        )
        self.repartidor = Repartidor.objects.create(
            nombre='Repartidor',
            apellido='User',
            email='repartidoruser@example.com',
            contraseña='password123'
        )
        self.envio = Envio.objects.create(
            numero_seguimiento=123456,
            direccion_origen='Origen',
            direccion_destino='Destino',
            fecha_envio=timezone.make_aware(timezone.datetime(2023, 10, 2, 12, 0, 0)),
            estado_envio='pendiente',
            id_pedido=self.pedido,
            id_repartidor=self.repartidor
        )
        logger.info(f"Created Envio: {self.envio}")

    def test_envio_creation(self):
        logger.info("Testing Envio creation")
        self.assertEqual(self.envio.numero_seguimiento, 123456)
        self.assertEqual(self.envio.direccion_origen, 'Origen')
        self.assertEqual(self.envio.direccion_destino, 'Destino')
        self.assertEqual(self.envio.estado_envio, 'pendiente')
        self.assertEqual(self.envio.id_pedido, self.pedido)
        self.assertEqual(self.envio.id_repartidor, self.repartidor)
        logger.info("Envio creation test passed")

class NotificacionModelTest(BaseModelTest):
    def setUp(self):
        logger.info("Setting up NotificacionModelTest")
        self.usuario = Usuario.objects.create(
            nombre='Test',
            apellido='User',
            email='testuser@example.com',
            contraseña='password123'
        )
        self.envio = Envio.objects.create(
            numero_seguimiento=123456,
            direccion_origen='Origen',
            direccion_destino='Destino',
            fecha_envio=timezone.make_aware(timezone.datetime(2023, 10, 2, 12, 0, 0)),
            estado_envio='pendiente'
        )
        self.notificacion = Notificacion.objects.create(
            mensaje='Notificacion de prueba',
            fecha_envio=timezone.make_aware(timezone.datetime(2023, 10, 2, 12, 0, 0)),
            estado_envio='pendiente',
            id_envio=self.envio,
            id_usuario=self.usuario
        )
        logger.info(f"Created Notificacion: {self.notificacion}")

    def test_notificacion_creation(self):
        logger.info("Testing Notificacion creation")
        self.assertEqual(self.notificacion.mensaje, 'Notificacion de prueba')
        self.assertEqual(self.notificacion.estado_envio, 'pendiente')
        self.assertEqual(self.notificacion.id_envio, self.envio)
        self.assertEqual(self.notificacion.id_usuario, self.usuario)
        logger.info("Notificacion creation test passed")