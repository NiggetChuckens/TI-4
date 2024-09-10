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
    if (this.password === this.confirmPassword) {
      this.isLoading = true;
      const userData = {
        nombre: this.fullName.split(' ')[0],
        apellido: this.fullName.split(' ')[1] || '',
        email: this.email,
        contraseña: this.password
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
          this.message = data.error;
        } else {
          this.isError = false;
          this.message = 'User registered successfully';
          this.navCtrl.navigateBack('/tabs/login', {
            animated: true,
            animationDirection: 'back'
          });
        } 
      })
      .catch(error => {
        this.isLoading = false;
        this.isError = true;
        this.message = 'Error: ' + error;
      });
    } else {
      this.isError = true;
      this.message = 'Passwords do not match';
    }
  }

  navigateToLogin() {
    this.navCtrl.navigateForward('/tabs/login', {
      animated: true,
      animationDirection: 'forward'
    });
  }
}
