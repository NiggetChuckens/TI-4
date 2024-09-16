import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { perfilPage } from './perfil.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { perfilPageRoutingModule } from './perfil-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    perfilPageRoutingModule,
    HttpClientModule,
    
  ],
  declarations: [perfilPage]
})
export class perfilPageModule {}
