import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

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

    fetch('http://127.0.0.1:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
      this.isLoading = false;
      if (data.error) {
        this.isError = true;
        this.message = data.error;
      } else {
        this.isError = false;
        this.message = 'Login successful';
        this.navCtrl.navigateForward('/tabs/user-home', {
          animated: true,
          animationDirection: 'forward'
        });
      }
    })
    .catch(error => {
      this.isLoading = false;
      this.isError = true;
      this.message = 'Error: ' + error;
    });
  }

  navigateToRegister() {
    this.navCtrl.navigateForward('/tabs/register', {
      animated: true,
      animationDirection: 'forward'
    });
  }
}
