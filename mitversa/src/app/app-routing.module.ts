import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'repartidores',
    loadChildren: () => import('./repartidores/repartidores.module').then( m => m.RepartidoresPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.perfilPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'user-home',
    loadChildren: () => import('./user-home/user-home.module').then( m => m.UserHomePageModule)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'repartidores',
    loadChildren: () => import('./repartidores/repartidores.module').then( m => m.RepartidoresPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.perfilPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'user-home',
    loadChildren: () => import('./user-home/user-home.module').then( m => m.UserHomePageModule)
  },
  {
    path: 'user-pedidos',
    loadChildren: () => import('./user-pedidos/user-pedidos.module').then( m => m.UserPedidosPageModule)
  },
  {
    path: 'scanner',
    loadChildren: () => import('./scanner/scanner.module').then( m => m.ScannerPageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./test/test.module').then( m => m.TestPageModule)
  },
  {
    path: 'gerente-home',
    loadChildren: () => import('./gerente-home/gerente-home.module').then( m => m.GerenteHomePageModule)
  },
  {
    path: 'add-repartidor',
    loadChildren: () => import('./add-repartidor/add-repartidor.module').then( m => m.AddRepartidorPageModule)
  },
  {
    path: 'repartidor-home',
    loadChildren: () => import('./repartidor-home/repartidor-home.module').then( m => m.RepartidorHomePageModule)
  },
  {
    path: 'repartidor-historial',
    loadChildren: () => import('./repartidor-historial/repartidor-historial.module').then( m => m.RepartidorHistorialPageModule)
  },
  {
    path: 'edit-repartidor',
    loadChildren: () => import('./edit-repartidor/edit-repartidor.module').then(m => m.EditRepartidorPageModule)
  },
  {
    path: 'asignar-pedido',
    loadChildren: () => import('./asignar-pedido/asignar-pedido.module').then( m => m.AsignarPedidoPageModule)
  },
  {
    path: 'detalle-pedido/:pedidoId',
    loadChildren: () => import('./detalle-pedido/detalle-pedido.module').then( m => m.DetallePedidoPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
