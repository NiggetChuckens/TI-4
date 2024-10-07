import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepartidorHomePage } from './repartidor-home.page';

const routes: Routes = [
  {
    path: '',
    component: RepartidorHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepartidorHomePageRoutingModule {}
