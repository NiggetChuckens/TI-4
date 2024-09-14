import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';
  isLoading = false;
  message = '';
  isError = false;

  constructor(private navCtrl: NavController, private http: HttpClient) {}

  handleRegister() {
    if (this.password.length < 6) {
      this.isError = true;
      this.message = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.isError = true;
      this.message = 'Las contraseñas no coinciden.';
      return;
    }
    this.isLoading = true;
    const [nombre, ...apellidoParts] = this.fullName.split(' ');
    const userData = {
      nombre,
      apellido: apellidoParts.join(' '),
      email: this.email,
      contraseña: this.password,
      confirmar_contraseña: this.confirmPassword
    };

    this.http.post('http://127.0.0.1:8000/api/register', userData).subscribe(
      (data: any) => {
        this.isLoading = false;
        if (data.error) {
          this.isError = true;
          if (data.error.includes('correo ingresado ya existe')) {
            this.message = 'El correo ingresado ya existe.';
          } else {
            this.message = data.error;
          }
        } else {
          this.isError = false;
          this.message = 'Usuario registrado correctamente.';
          setTimeout(() => {
            this.navCtrl.navigateBack('/tabs/login', {
              animated: true,
              animationDirection: 'back'
            });
          }, 3000);
        }   
      },
      error => {
        this.isLoading = false;
        this.isError = true;
        this.message = 'Error: ' + error.message;
      }
    );
  }

  navigateToLogin() {
    this.navCtrl.navigateForward('/tabs/login', {
      animated: true,
      animationDirection: 'forward'
    });
  }
  
}
