import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-repartidor-historial',
  templateUrl: './repartidor-historial.page.html',
  styleUrls: ['./repartidor-historial.page.scss'],
})
export class RepartidorHistorialPage implements OnInit {
  pedidos = [
    { id: '0001', direccion: 'Av alemania #1121, Temuco', estado: 'entregado' },
    { id: '0002', direccion: 'Av alemania #2000, Temuco', estado: 'cancelado' },
    { id: '0003', direccion: 'Av alemania #1500, Temuco', estado: 'entregado' },
    { id: '0004', direccion: 'Av alemania #3000, Temuco', estado: 'cancelado' },
  ];

  selectedSegment: string = 'entregados'; // Por defecto se muestran los entregados
  filteredPedidos: any[] = [];

  constructor() {}

  ngOnInit() {
    this.filterPedidos();
  }

  segmentChanged(event: any) {
    this.filterPedidos();
  }

  filterPedidos() {
    if (this.selectedSegment === 'entregados') {
      this.filteredPedidos = this.pedidos.filter(p => p.estado === 'entregado');
    } else {
      this.filteredPedidos = this.pedidos.filter(p => p.estado === 'cancelado');
    }
  }
  selectSegment(segment: string) {
    this.selectedSegment = segment;
    this.filterPedidos();
  }
  
  
}