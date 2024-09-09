from django.urls import path, include
from rest_framework.routers import DefaultRouter
from views.login_view import login_view
from .views import (
    UsuarioViewSet,
    GerenteViewSet,
    RepartidorViewSet,
    ProductoViewSet,
    PedidoViewSet,
    EnvioViewSet,
    NotificacionViewSet
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
    path('', include(router.urls)),
    path('login/', login_view, name='login'),
]