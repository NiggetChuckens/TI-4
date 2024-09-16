import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPedidosPage } from './user-pedidos.page';

const routes: Routes = [
  {
    path: '',
    component: UserPedidosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPedidosPageRoutingModule {}
