import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditRepartidorPageRoutingModule } from './edit-repartidor-routing.module';

import { EditRepartidorPage } from './edit-repartidor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditRepartidorPageRoutingModule
  ],
  declarations: [EditRepartidorPage]
})
export class EditRepartidorPageModule {}
