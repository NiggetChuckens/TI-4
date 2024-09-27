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
      profilePicture: 'https://media.discordapp.net/attachments/1032485071875219527/1171688219629330462/image.png?ex=66f1aa70&is=66f058f0&hm=be56f39f70e95bacd28d4fc5fcf5e49d73c740da914209f547b672abfd7bdbef&=&format=webp&quality=lossless',
      repartos: 356,
      devueltos: 15,
      entregados: 341,
    },
    {
      name: 'Juaker aguilar',
      email: 'elmasaguilar@sex.cl',
      patente: 'Sex-6969',
      profilePicture: 'https://media.discordapp.net/attachments/1032485071875219527/1248136773859676161/image.png?ex=66f19c34&is=66f04ab4&hm=88997a7d3535ab5649e6241fdc67176ab1ef52b476ffdcd629c91f32a0aaa9ca&=&format=webp&quality=lossless&width=533&height=670',
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
    console.log('Editar perfil de:', repartidor.name);
  }

  assignOrder(repartidor: Repartidor) {
    console.log('Asignar pedido a:', repartidor.name);
  }

  // Método para ir a la página de agregar repartidor
  goToAddRepartidor() {
    this.navCtrl.navigateForward('/tabs/add-repartidor');
  }
}
