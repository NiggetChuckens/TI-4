import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient para hacer solicitudes HTTP
import { NavController } from '@ionic/angular'; // Importa NavController para la navegación
import { environment } from 'src/environments/environment.prod'; //Importa la dirección ip del api en django

@Component({
  selector: 'app-page3',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class perfilPage implements OnInit {
  user: any = {
  }; // Definir un objeto vacío para almacenar los datos del usuario

  constructor(private http: HttpClient, private navCtrl: NavController) {} // Inyectar HttpClient y NavController

  ngOnInit() {
    this.getUserData();
  }
  

  getUserData() {
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
          this.user = {
            id_usuario: data.id_usuario,
            nombre: data.nombre,
            apellido: data.apellido,
            email: data.email
          };
        })
        .catch(error => {
          console.error('Error al obtener los datos del usuario:', error);
        });
    } else {
      console.log('No se encontró el userId en sessionStorage');
    }
  }
  
  handleLogout() {
    console.log('Logout clicked');
    
    // Eliminar el estado de sesión de sessionStorage
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userId'); // Eliminar el ID del usuario

    // Redirigir al usuario a la página de login
    this.navCtrl.navigateRoot('/tabs/login').then(() => {
      // Recargar la página para actualizar los tabs
      window.location.reload();
    });
  }
}
