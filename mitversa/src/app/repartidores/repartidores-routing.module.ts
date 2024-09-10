import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepartidoresPage } from './repartidores.page';

const routes: Routes = [
  {
    path: '',
    component: RepartidoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepartidoresPageRoutingModule {}
