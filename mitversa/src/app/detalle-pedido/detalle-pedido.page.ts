import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.page.html',
  styleUrls: ['./detalle-pedido.page.scss'],
})
export class DetallePedidoPage implements OnInit {
  pedidoId!: string;  // Usamos el operador "!" para indicar que se inicializará después
  direccion!: string;
  cliente!: string;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    // Recogemos los datos pasados por parámetro
    this.pedidoId = this.route.snapshot.paramMap.get('pedidoId') || 'N/A';
    this.direccion = this.route.snapshot.queryParamMap.get('direccion') || 'No disponible';
    this.cliente = this.route.snapshot.queryParamMap.get('cliente') || 'No disponible';
  }

  goBack() {
    this.navCtrl.back();
  }
}
