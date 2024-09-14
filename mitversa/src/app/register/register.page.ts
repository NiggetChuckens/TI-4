import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  fullName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  isLoading: boolean = false;
  message: string = '';
  isError: boolean = false;

  constructor(private navCtrl: NavController) {}

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
    const userData = {
      nombre: this.fullName.split(' ')[0],
      apellido: this.fullName.split(' ')[1] || '',
      email: this.email,
      contraseña: this.password,
      confirmar_contraseña: this.confirmPassword // Add this line
    };

    fetch('http://127.0.0.1:8000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
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
    })
    .catch(error => {
      this.isLoading = false;
      this.isError = true;
      this.message = 'Error: ' + error;
    });
  }

  navigateToLogin() {
    this.navCtrl.navigateForward('/tabs/login', {
      animated: true,
      animationDirection: 'forward'
    });
  }
  
}
