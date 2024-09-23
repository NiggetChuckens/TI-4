import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxEchartsModule } from 'ngx-echarts';



import { IonicModule } from '@ionic/angular';

import { GerenteHomePageRoutingModule } from './gerente-home-routing.module';

import { GerenteHomePage } from './gerente-home.page';


  @NgModule({
    imports: [
      CommonModule,
      IonicModule,
      GerenteHomePageRoutingModule,
      NgxEchartsModule // Importa NgxEchartsModule aquí también
    ],
    declarations: [GerenteHomePage]
  })
  export class GerenteHomePageModule {}
  
