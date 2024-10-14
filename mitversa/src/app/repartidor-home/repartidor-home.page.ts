import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-repartidor-home',
  templateUrl: './repartidor-home.page.html',
  styleUrls: ['./repartidor-home.page.scss'],
})
export class RepartidorHomePage implements OnInit {

  pedidos = [
    { id: '0001', direccion: 'Av alemania #1121, Temuco'},
    { id: '0002', direccion: 'Av alemania #1121, Temuco'},
    { id: '0003', direccion: 'Av alemania #1121, Temuco'},
    { id: '0004', direccion: 'Av alemania #1121, Temuco'},
  ];

  constructor() { }

  ngOnInit() {
  }
  navigateToDetail(pedidoId: string) {
    // Redirige a la página de detalles del pedido, pasando el ID del pedido
   // this.navCtrl.navigateForward(`/detalle-pedido/${pedidoId}`);
  }


}
