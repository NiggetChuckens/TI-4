import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular'; // Importa AlertController

interface Repartidor {
  name: string;
  email: string;
  patente:string;
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
      name: 'Robertito Nieves',
      email: 'enfasis@muu.cow',
      patente: 'Vaca-42065',
      profilePicture: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQE0puZEMCCinpfPb1Ogt5V-Mww9FyUF0ba-SO_nyKmVLaDrxmrv2RFnvhzlGUgLaBxObMen_7p7P8aEyU',
      repartos: 356,
      devueltos: 15,
      entregados: 341,
    },
    {
      name: 'Juaker aguilar',
      email: 'elmasaguilar@sex.cl',
      patente: 'Sex-6969',
      profilePicture: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSaHOanyX4SZTw0IqwA6t0044Ea_aUeDENZASC8t1RFYCTEx_go',
      repartos: 400,
      devueltos: 10,
      entregados: 390,
    },
  ];

  filteredRepartidores: Repartidor[] = [...this.repartidores];

  constructor(private navCtrl: NavController, private alertController: AlertController) {} // Inyecta AlertController

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

  // Método para mostrar confirmación antes de eliminar
  async confirmDeleteRepartidor(repartidor: Repartidor) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro de que quieres eliminar a ${repartidor.name}?`, // Nombre en negritas
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'cancel-button', // Clase personalizada para el botón de cancelar
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteRepartidor(repartidor);
          },
        },
      ],
    });
  
    await alert.present();
  }

  deleteRepartidor(repartidor: Repartidor) {
    this.repartidores = this.repartidores.filter(r => r !== repartidor);
    this.filteredRepartidores = [...this.repartidores];
  }

  editProfile(repartidor: Repartidor) {
    this.navCtrl.navigateForward('/tabs/edit-repartidor');
  }

  assignOrder(repartidor: Repartidor) {
    console.log('Asignar pedido a:', repartidor.name);
    this.navCtrl.navigateForward('/tabs/asignar-pedido');
  }
  

  // Método para ir a la página de agregar repartidor
  goToAddRepartidor() {
    this.navCtrl.navigateForward('/tabs/add-repartidor');
  }

}
