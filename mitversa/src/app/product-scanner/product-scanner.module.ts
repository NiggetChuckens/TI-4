import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductScannerPageRoutingModule } from './product-scanner-routing.module';

import { ProductScannerPage } from './product-scanner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductScannerPageRoutingModule
  ],
  declarations: [ProductScannerPage]
})
export class ProductScannerPageModule {}
