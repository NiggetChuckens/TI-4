import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient para hacer solicitudes HTTP
import { NavController } from '@ionic/angular'; // Importa NavController para la navegación
import { environment } from 'src/environments/environment.prod'; // Importa la dirección ip del api en django

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  userType: string = '';
  isLoggedIn: boolean = false; 

  constructor(private http: HttpClient, private navCtrl: NavController) {}

  ngOnInit() {
    this.checkLoginStatus();
  }

  ionViewWillEnter() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    // Verificar el estado de inicio de sesión y tipo de usuario en sessionStorage
    console.log('isLoggedIn:', sessionStorage.getItem('isLoggedIn'));
    console.log('userType:', sessionStorage.getItem('userType'));

    // Obtener el tipo de usuario y estado de login desde sessionStorage
    this.userType = sessionStorage.getItem('userType') || '';
    this.isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    // Redirigir si no está logueado
    if (!this.isLoggedIn) {
      this.navCtrl.navigateRoot('/login');
    } else {
      // Fetch para obtener el tipo de usuario
      const userId = sessionStorage.getItem('userId');
      console.log('UserId obtenido:', userId); // Verifica que el userId sea correcto

      if (userId) {
        fetch(`${environment.apiUrl}/api/usuarios/${userId}`, {
          headers: {
            'ngrok-skip-browser-warning': 'true' // Agregar la cabecera para evitar el error de CORS
          }
        })
          .then(response => response.json())
          .then(data => {
            console.log('Datos recibidos del servidor:', data); // Verifica los datos recibidos del servidor
            this.userType = data.tipo_usuario;
            sessionStorage.setItem('userType', this.userType);
          })
          .catch(error => {
            console.error('Error al obtener el tipo de usuario:', error);
          });
      } else {
        console.log('No se encontró el userId en sessionStorage');
      }
    }
  }

  // Método para determinar qué tabs mostrar dependiendo del tipo de usuario
  getTabs() {
    if (this.userType === 'repartidor') {
      return [
        { label: 'Entregas', route: '/tabs/entregas', icon: 'cube-outline' },
        { label: 'Pedidos', route: '/tabs/pedidos', icon: 'list-outline' },
        { label: 'Perfil', route: '/tabs/perfil', icon: 'person-outline' },
        { label: 'Scanner', route: '/tabs/scanner', icon: 'scan-outline' }
      ];
    } else if (this.userType === 'gerente') {
      return [
        { label: 'Dashboard', route: '/tabs/repartidores', icon: 'car' },
        { label: 'Historial', route: '/repartidor-historial', icon: 'home-outline' },
        { label: 'Perfil', route: '/tabs/perfil', icon: 'person-outline' },
        { label: 'Scanner', route: '/tabs/scanner', icon: 'scan-outline' }
      ];
    } else if (this.userType === 'cliente') {
      // Por defecto, para usuarios normales
      return [
        { label: 'Home', route: '/tabs/user-home', icon: 'home-outline' },
        { label: 'Pedidos', route: '/tabs/pedidos', icon: 'list-outline' },
        { label: 'Perfil', route: '/tabs/perfil', icon: 'person-outline' },
      ];
    } else {
      return [];
    }
  }
}