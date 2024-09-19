import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShipmentStatsPageRoutingModule } from './shipment-stats-routing.module';

import { ShipmentStatsPage } from './shipment-stats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShipmentStatsPageRoutingModule
  ],
  declarations: [ShipmentStatsPage]
})
export class ShipmentStatsPageModule {}
