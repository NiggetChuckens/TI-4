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

  constructor(private navCtrl: NavController) {}

  handleRegister() {
    if (this.password === this.confirmPassword) {
      console.log('User registered:', this.fullName, this.email);
      this.navCtrl.navigateBack('/login', {
        animated: true,
        animationDirection: 'back'
      });
    } else {
      console.log('Passwords do not match');
    }
  }

  navigateToLogin() {
    this.navCtrl.navigateForward('/tabs/login', {
      animated: true,
      animationDirection: 'forward'
    });
  }
}
