import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserHomePageRoutingModule } from './user-home-routing.module';
import { UserHomePage } from './user-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserHomePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    UserHomePage
  ]
})
export class UserHomePageModule {}