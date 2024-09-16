import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShipmentStatsPage } from './shipment-stats.page';

const routes: Routes = [
  {
    path: '',
    component: ShipmentStatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShipmentStatsPageRoutingModule {}
