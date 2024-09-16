import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPedidosPageRoutingModule } from './user-pedidos-routing.module';

import { UserPedidosPage } from './user-pedidos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPedidosPageRoutingModule
  ],
  declarations: [UserPedidosPage]
})
export class UserPedidosPageModule {}
