import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepartidorHistorialPageRoutingModule } from './repartidor-historial-routing.module';

import { RepartidorHistorialPage } from './repartidor-historial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepartidorHistorialPageRoutingModule
  ],
  declarations: [RepartidorHistorialPage]
})
export class RepartidorHistorialPageModule {}
