import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepartidorHomePageRoutingModule } from './repartidor-home-routing.module';

import { RepartidorHomePage } from './repartidor-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepartidorHomePageRoutingModule
  ],
  declarations: [RepartidorHomePage]
})
export class RepartidorHomePageModule {}
