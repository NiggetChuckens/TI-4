import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsignarPedidoPageRoutingModule } from './asignar-pedido-routing.module';

import { AsignarPedidoPage } from './asignar-pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsignarPedidoPageRoutingModule
  ],
  declarations: [AsignarPedidoPage]
})
export class AsignarPedidoPageModule {}
