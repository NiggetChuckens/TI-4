from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UsuarioViewSet,
    GerenteViewSet,
    RepartidorViewSet,
    ProductoViewSet,
    PedidoViewSet,
    EnvioViewSet,
    NotificacionViewSet,
    register_user,
    login_user
)

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'gerentes', GerenteViewSet)
router.register(r'repartidores', RepartidorViewSet)
router.register(r'productos', ProductoViewSet)
router.register(r'pedidos', PedidoViewSet)
router.register(r'envios', EnvioViewSet)
router.register(r'notificaciones', NotificacionViewSet)

urlpatterns = [
    path('register', register_user, name='register_user'),
    path('login', login_user, name='login_user'),
    path('', include(router.urls)),
]