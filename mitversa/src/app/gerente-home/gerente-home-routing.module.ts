import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GerenteHomePage } from './gerente-home.page';

const routes: Routes = [
  {
    path: '',
    component: GerenteHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GerenteHomePageRoutingModule {}
