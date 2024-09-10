import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
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
