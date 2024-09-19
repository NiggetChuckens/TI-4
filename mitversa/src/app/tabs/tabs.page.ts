import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  userType: string = '';
  isLoggedIn: boolean = false; 

  constructor() {}

  ngOnInit() {
      // Verificar el estado de inicio de sesión y tipo de usuario en sessionStorage
      console.log('isLoggedIn:', sessionStorage.getItem('isLoggedIn'));
      console.log('userType:', sessionStorage.getItem('userType'));
  
      // Obtener el tipo de usuario y estado de login desde sessionStorage
      this.userType = sessionStorage.getItem('userType') || '';
      this.isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  }
  

  // Método para determinar qué tabs mostrar dependiendo del tipo de usuario
  getTabs() {
    if (this.userType === 'repartidor') {
      return [
        { label: 'Entregas', route: '/tabs/entregas', icon: 'cube-outline' },
        { label: 'Pedidos', route: '/tabs/pedidos', icon: 'list-outline' },
<<<<<<< HEAD
        { label: 'Perfil', route: '/tabs/perfil', icon: 'person-outline' }
=======
        { label: 'Perfil', route: '/tabs/perfil', icon: 'person-outline' },
        { label: 'Scanner', route: '/tabs/scanner', icon: 'scan-outline' }
>>>>>>> origin/Dev-Christian
      ];
    } else if (this.userType === 'gerente') {
      return [
        { label: 'Dashboard', route: '/tabs/dashboard', icon: 'stats-chart-outline' },
        { label: 'Pedidos', route: '/tabs/pedidos', icon: 'list-outline' },
<<<<<<< HEAD
        { label: 'Perfil', route: '/tabs/perfil', icon: 'person-outline' }
=======
        { label: 'Perfil', route: '/tabs/perfil', icon: 'person-outline' },
        { label: 'Scanner', route: '/tabs/scanner', icon: 'scan-outline' }
>>>>>>> origin/Dev-Christian
      ];
    } else {
      // Por defecto, para usuarios normales
      return [
        { label: 'Home', route: '/tabs/user-home', icon: 'home-outline' },
        { label: 'Pedidos', route: '/tabs/pedidos', icon: 'list-outline' },
<<<<<<< HEAD
        { label: 'Perfil', route: '/tabs/perfil', icon: 'person-outline' }
=======
        { label: 'Perfil', route: '/tabs/perfil', icon: 'person-outline' },
        { label: 'Scanner', route: '/tabs/scanner', icon: 'scan-outline' } //test eliminar o comentar cuando no se necesite
>>>>>>> origin/Dev-Christian
      ];
    }
  }
}
