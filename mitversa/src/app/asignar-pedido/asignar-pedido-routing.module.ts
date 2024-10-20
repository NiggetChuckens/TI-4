import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsignarPedidoPage } from './asignar-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: AsignarPedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsignarPedidoPageRoutingModule {}
