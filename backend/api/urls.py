from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UsuarioViewSet,
    CiudadViewSet,
    ComunaViewSet,
    TipoIncidenciaViewSet,
    EstadoEnvioViewSet,
    DireccionViewSet,
    VehiculoViewSet,
    EnvioViewSet,
    HistorialAsignacionViewSet,
    HistorialEnvioViewSet,
    IncidenciaViewSet,
    NotificacionViewSet,
    PaqueteViewSet,
    register_user,
    login_user
)

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'ciudades', CiudadViewSet)
router.register(r'comunas', ComunaViewSet)
router.register(r'tipos-incidencia', TipoIncidenciaViewSet)
router.register(r'estados-envio', EstadoEnvioViewSet)
router.register(r'direcciones', DireccionViewSet)
router.register(r'vehiculos', VehiculoViewSet)
router.register(r'envios', EnvioViewSet)
router.register(r'historiales-asignacion', HistorialAsignacionViewSet)
router.register(r'historiales-envio', HistorialEnvioViewSet)
router.register(r'incidencias', IncidenciaViewSet)
router.register(r'notificaciones', NotificacionViewSet)
router.register(r'paquetes', PaqueteViewSet)

urlpatterns = [
    path('register', register_user, name='register_user'),
    path('login', login_user, name='login_user'),
    path('', include(router.urls)),
]
