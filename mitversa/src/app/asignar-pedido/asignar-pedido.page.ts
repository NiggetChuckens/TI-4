import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-asignar-pedido',
  templateUrl: './asignar-pedido.page.html',
  styleUrls: ['./asignar-pedido.page.scss'],
})
export class AsignarPedidoPage implements OnInit {

  pedidos: string[] = [
    'Pedido 1: Calle A #123',
    'Pedido 2: Calle B #456',
    'Pedido 3: Calle C #789',
    'Pedido 4: Calle D #1011',
    'Pedido 5: Calle E #1213'
  ];
  selectedPedidos: string[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private navCtrl: NavController
  ) { }
  isLoading: boolean = false;
  ngOnInit() {}

  // Confirmación de la asignación
  async presentConfirm() {
    const pedidosSeleccionados = this.selectedPedidos.join(', ');

    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: `¿Estás seguro de asignar los siguientes pedidos?${pedidosSeleccionados}`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'cancel-button',
          handler: () => {
            console.log('Asignación cancelada');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.confirmarAsignacion();
          }
        }
      ]
    });

    await alert.present();
  }

  // Navegar hacia atrás
  goBack() {
    this.navCtrl.navigateBack('/tabs/repartidores');
  }
  
  // Asignación confirmada, mostrar toast y redirigir a repartidores
  async confirmarAsignacion() {
    this.isLoading = true;
    setTimeout(async () => {
      this.isLoading = false;

      // Muestra el mensaje de éxito
      const toast = await this.toastController.create({
        message: 'Se ha asignado los pedidos correspondientes.',
        duration: 2000,
        color: 'success',
        position: 'top'
      });
      toast.present();

      this.navCtrl.navigateBack('/tabs/repartidores');
    }, 2000);

    console.log('Pedidos asignados:', this.selectedPedidos);
  }
}
