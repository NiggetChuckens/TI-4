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

  constructor(private navCtrl: NavController) {}

  handleLogin() {
    console.log('Login attempted with:', {
      email: this.email,
      password: this.password,
      rememberMe: this.rememberMe,
    });
  }

  navigateToRegister() {
    this.navCtrl.navigateForward('/tabs/register', {
      animated: true,
      animationDirection: 'forward'
    });
  }
}
