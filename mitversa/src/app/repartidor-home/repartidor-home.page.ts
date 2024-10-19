import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'; // Importamos NavController

@Component({
  selector: 'app-repartidor-home',
  templateUrl: './repartidor-home.page.html',
  styleUrls: ['./repartidor-home.page.scss'],
})
export class RepartidorHomePage implements OnInit {

  pedidos = [
    { id: '0001', direccion: 'Av alemania #1121, Temuco', cliente: 'Juan Pérez' },
    { id: '0002', direccion: 'Av alemania #2000, Temuco', cliente: 'Ana Gómez' },
    { id: '0003', direccion: 'Av alemania #1500, Temuco', cliente: 'Pedro Sánchez' },
    { id: '0004', direccion: 'Av alemania #3000, Temuco', cliente: 'Luis Fernández' },
  ];

  constructor(private navCtrl: NavController) { }

  ngOnInit() {}

  navigateToDetail(pedidoId: string, direccion: string, cliente: string) {
    this.navCtrl.navigateForward(`/tabs/detalle-pedido/${pedidoId}`, {
      queryParams: {
        direccion: direccion,
        cliente: cliente
      }
    });
  }
}
