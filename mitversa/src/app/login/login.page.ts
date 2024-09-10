import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class loginPage {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor() {}

  handleLogin() {
    console.log('Login attempted with:', {
      email: this.email,
      password: this.password,
      rememberMe: this.rememberMe,
    });
    // Implement login logic here
  }
}
