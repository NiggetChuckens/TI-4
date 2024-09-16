import { Component, OnInit } from '@angular/core';

interface Repartidor {
  name: string;
  email: string;
  profilePicture: string;
  repartos: number;
  devueltos: number;
  entregados: number;
}

@Component({
  selector: 'app-repartidores',
  templateUrl: './repartidores.page.html',
  styleUrls: ['./repartidores.page.scss'],
})
export class RepartidoresPage implements OnInit {
  searchTerm: string = '';
  repartidores: Repartidor[] = [
    {
      name: 'Sandra Haro',
      email: 'hola@unsitiogenial.es',
      profilePicture: 'https://unsplash.it/100/100?image=1027',
      repartos: 356,
      devueltos: 15,
      entregados: 26
    },
    {
      name: 'Juan Perez',
      email: 'juan@unsitiogenial.es',
      profilePicture: 'https://unsplash.it/100/100?image=1012',
      repartos: 400,
      devueltos: 10,
      entregados: 30
    }
    // Añade más repartidores aquí
  ];

  filteredRepartidores: Repartidor[] = [...this.repartidores]; // Inicialmente todos los repartidores

  constructor() {}

  ngOnInit() {}

  filterRepartidores() {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredRepartidores = this.repartidores.filter(repartidor => {
      return (
        repartidor.name.toLowerCase().includes(searchTermLower) ||
        repartidor.email.toLowerCase().includes(searchTermLower)
      );
    });
  }

  deleteRepartidor(repartidor: Repartidor) { // Tipo Repartidor definido
    this.repartidores = this.repartidores.filter(r => r !== repartidor);
    this.filteredRepartidores = [...this.repartidores]; // Actualiza la lista filtrada
  }
  editProfile(repartidor: Repartidor) {
    // Aquí iría la lógica para editar el perfil del repartidor
    console.log('Editar perfil de:', repartidor.name);
  }
  
  assignOrder(repartidor: Repartidor) {
    // Aquí iría la lógica para asignar un pedido al repartidor
    console.log('Asignar pedido a:', repartidor.name);
  }
  
}
