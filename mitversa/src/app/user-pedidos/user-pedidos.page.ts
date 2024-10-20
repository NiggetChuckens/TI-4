import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-pedidos',
  templateUrl: './user-pedidos.page.html',
  styleUrls: ['./user-pedidos.page.scss'],
})
export class UserPedidosPage implements OnInit {

  pedidos = [
    { id: '0001', direccion: 'Av alemania #1121, Temuco', estado: 'entregado' },
    { id: '0002', direccion: 'Av alemania #2000, Temuco', estado: 'no entregado' },
    { id: '0003', direccion: 'Av alemania #1500, Temuco', estado: 'entregado' },
    { id: '0004', direccion: 'Av alemania #3000, Temuco', estado: 'no entregado' },
  ];

  selectedSegment: string = 'entregados'; // Por defecto se muestran los entregados
  filteredPedidos: any[] = [];

  constructor() { }

  ngOnInit() {
    this.filterPedidos();
  }

  selectSegment(segment: string) {
    this.selectedSegment = segment;
    this.filterPedidos();
  }

  filterPedidos() {
    if (this.selectedSegment === 'entregados') {
      this.filteredPedidos = this.pedidos.filter(p => p.estado === 'entregado');
    } else {
      this.filteredPedidos = this.pedidos.filter(p => p.estado === 'no entregado');
    }
  }
}
