import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage {
  email = '';
  password = '';
  rememberMe = false;
  isLoading = false;
  message = '';
  isError = false;

  constructor(private navCtrl: NavController, private http: HttpClient) {}

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
      contraseña: this.password
    };

    this.http.post('http://127.0.0.1:8000/api/login', loginData).subscribe(
      (data: any) => {
        this.isLoading = false;
        console.log(data); // Verifica la estructura de la respuesta

        if (data.error) {
          this.isError = true;
          this.message = data.error;
        } else {
          this.isError = false;
          this.message = 'Login successful';
          
          const isLoggedIn = !!(data.id_usuario || data.id_repartidor || data.id_gerente);
          sessionStorage.setItem('isLoggedIn', isLoggedIn.toString());

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
          this.navCtrl.navigateRoot('/tabs/user-home').then(() => {
            window.location.reload(); // Recargar para que se actualicen los tabs basados en sessionStorage
          });
        }
      },
      error => {
        this.isLoading = false;
        this.isError = true;
        this.message = 'Error: ' + error.message;
      }
    );
  }

  navigateToRegister() {
    this.navCtrl.navigateForward('/tabs/register', {
      animated: true,
      animationDirection: 'forward'
    });
  }
}
