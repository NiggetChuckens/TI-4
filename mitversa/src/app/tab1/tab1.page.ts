import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) { }

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        if (response.valid) {
          console.log('Login successful');
          console.log('User type:', response.user_type);
          // Handle successful login (e.g., navigate to appropriate page based on user type)
        } else {
          this.errorMessage = 'Invalid credentials';
        }
      },
      (error) => {
        this.errorMessage = 'An error occurred. Please try again.';
        console.error('Login error', error);
      }
    );
  }
}
