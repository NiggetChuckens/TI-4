import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductScannerPage } from './product-scanner.page';

const routes: Routes = [
  {
    path: '',
    component: ProductScannerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductScannerPageRoutingModule {}
