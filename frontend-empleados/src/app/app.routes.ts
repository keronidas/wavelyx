import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/login.guard';

export const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      {
        path: 'pedidos',
        component: PedidosComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'empleados',
        component: EmpleadosComponent,
        canActivate: [AuthGuard],
      },
      { path: '**', redirectTo: 'home' },
    ],
  },
  { path: '**', redirectTo: 'home' },
];
