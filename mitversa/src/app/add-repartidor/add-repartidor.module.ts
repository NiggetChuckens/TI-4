import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRepartidorPageRoutingModule } from './add-repartidor-routing.module';

import { AddRepartidorPage } from './add-repartidor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddRepartidorPageRoutingModule
  ],
  declarations: [AddRepartidorPage]
})
export class AddRepartidorPageModule {}
