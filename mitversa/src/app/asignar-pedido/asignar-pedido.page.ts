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

  // Asignación confirmada, mostrar toast y redirigir a repartidores
  async confirmarAsignacion() {
    const toast = await this.toastController.create({
      message: 'Se ha asignado los pedidos correspondientes.',
      duration: 2000, // Mostrar el toast por 2 segundos
      position: 'bottom'
    });

    await toast.present();

    // Redirigir a la página de repartidores después de que el toast desaparezca
    toast.onDidDismiss().then(() => {
      this.navCtrl.navigateBack('/tabs/repartidores');
    });

    console.log('Pedidos asignados:', this.selectedPedidos);
  }
}
