import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'register',
        loadChildren: () => import('../register/register.module').then(m => m.RegisterPageModule)
      },
      
      {
        path: 'user-home',
        loadChildren: () => import('../user-home/user-home.module').then(m => m.UserHomePageModule)
      },
      {
        path: 'user-pedidos',
        loadChildren: () => import('../user-pedidos/user-pedidos.module').then(m => m.UserPedidosPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then(m => m.perfilPageModule)
      },
      {
        path: 'scanner',
        loadChildren: () => import('../scanner/scanner.module').then(m => m.ScannerPageModule)
      },
      {
      path: 'gerente-home',
      loadChildren: () => import('../gerente-home/gerente-home.module').then(m=> m.GerenteHomePageModule)
      },
      


      {
        path: '',
        redirectTo: '/tabs/login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/login',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
