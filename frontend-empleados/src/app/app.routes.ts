import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './auth/pages/login/login.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'pedidos', component: PedidosComponent },
      { path: 'empleados', component: EmpleadosComponent },
      { path: '**', redirectTo: 'home' },
    ],
  },
];
