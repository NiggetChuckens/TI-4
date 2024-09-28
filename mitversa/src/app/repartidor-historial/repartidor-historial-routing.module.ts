import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepartidorHistorialPage } from './repartidor-historial.page';

const routes: Routes = [
  {
    path: '',
    component: RepartidorHistorialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepartidorHistorialPageRoutingModule {}
