import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { loginPage } from './login.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { loginPageRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    loginPageRoutingModule
  ],
  declarations: [loginPage]
})
export class LoginPageModule {}
