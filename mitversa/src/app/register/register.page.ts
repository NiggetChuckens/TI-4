import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  handleRegister() {
    if (this.password === this.confirmPassword) {
      console.log('User registered:', this.fullName, this.email);
      // Navegar de regreso a login luego del registro
      this.router.navigate(['/login']);
    } else {
      console.log('Passwords do not match');
    }
  }
}
