import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditRepartidorPage } from './edit-repartidor.page';

const routes: Routes = [
  {
    path: '',
    component: EditRepartidorPage
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditRepartidorPageRoutingModule {}
