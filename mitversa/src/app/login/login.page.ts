import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class loginPage {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  isLoading: boolean = false;
  message: string = '';
  isError: boolean = false;

  constructor(private navCtrl: NavController) {}

  // Función auxiliar para almacenar los datos de usuario
  storeUserData(userId: string, userType: string, rememberMe: boolean) {
    if (rememberMe) {
      localStorage.setItem('userId', userId);
      localStorage.setItem('userType', userType);
    } else {
      sessionStorage.setItem('userId', userId);
      sessionStorage.setItem('userType', userType);
    }
  }

  handleLogin() {
    if (!this.email || !this.password) {
      this.isError = true;
      this.message = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;
    const loginData = {
      email: this.email,
      password: this.password
    };

    fetch(`${environment.apiUrl}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      this.isLoading = false;

      console.log(data); // Verifica la estructura de la respuesta

      if (data.error) {
        this.isError = true;
        this.message = data.error;
      } else {
        this.isError = false;
        this.message = 'Login successful';
        
        if (data.id_usuario || data.id_repartidor || data.id_gerente) {
          sessionStorage.setItem('isLoggedIn', 'true'); // Guarda que el usuario ha iniciado sesión
        } else {
          sessionStorage.setItem('isLoggedIn', 'false'); // En caso contrario, indica que no está logueado
        }
      // Después de iniciar sesión y guardar en sessionStorage
      this.navCtrl.navigateRoot('/tabs/user-home').then(() => {
      window.location.reload(); // Recargar para que se actualicen los tabs basados en sessionStorage
      });


        // Verificar y almacenar los datos según el tipo de usuario
        if (data.id_gerente) {
          this.storeUserData(data.id_gerente, 'gerente', this.rememberMe);
        } else if (data.id_repartidor) {
          this.storeUserData(data.id_repartidor, 'repartidor', this.rememberMe);
        } else if (data.id_usuario) {
          this.storeUserData(data.id_usuario, 'usuario', this.rememberMe);
        } else {
          console.error('No se encontró un ID válido en la respuesta');
        }
        
        // Redirigir al usuario a la página de home
        this.navCtrl.navigateForward('/tabs/user-home', {
          animated: true,
          animationDirection: 'forward'
        });
      }
    })
    .catch(error => {
      this.isLoading = false;
      this.isError = true;
      this.message = 'Error: ' + error.message;
    });
  }

  navigateToRegister() {
    this.navCtrl.navigateForward('/tabs/register', {
      animated: true,
      animationDirection: 'forward'
    });
  }
}
