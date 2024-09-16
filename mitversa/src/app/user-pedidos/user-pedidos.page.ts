import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-pedidos',
  templateUrl: './user-pedidos.page.html',
  styleUrls: ['./user-pedidos.page.scss'],
})
export class UserPedidosPage implements OnInit {
  
  pedidos = [
    { id: '0001', direccion: 'Av alemania #1121, Temuco', estado: 'entregado' },
    { id: '0002', direccion: 'Av alemania #1121, Temuco', estado: 'transito' },
    { id: '0003', direccion: 'Av alemania #1121, Temuco', estado: 'no-entregado' },
    { id: '0004', direccion: 'Av alemania #1121, Temuco', estado: 'devuelto' },
  ];

  constructor() { }

  ngOnInit() {
  }

  navigateToDetail(pedidoId: string) {
    // Redirige a la página de detalles del pedido, pasando el ID del pedido
   // this.navCtrl.navigateForward(`/detalle-pedido/${pedidoId}`);
  }

}
