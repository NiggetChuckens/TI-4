import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  user = {
    name: 'Michael Scott',
    email: 'michaelscott@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    lastLogin: '2023-05-10 14:30',
    profilePicture: '/assets/placeholder-avatar.png',
  };

  constructor() {}

  ngOnInit() {
    // Initialize any necessary data or perform any required actions
  }

  handleLogout() {
    console.log('Logout clicked');
    // Implement logout logic here
  }
}
