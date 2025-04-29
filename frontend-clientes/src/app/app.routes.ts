import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ConfiguradorComponent } from './pages/configurador/configurador.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { ZonaUsuarioComponent } from './pages/zona-usuario/zona-usuario.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { BioProductsComponent } from './pages/bio-products/bio-products.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.routes') },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'configurador', component: ConfiguradorComponent },
      { path: 'catalogo-electronico', component: CatalogoComponent },
      { path: 'productos-biodegradables', component: BioProductsComponent },
      {
        path: 'zona-usuario',
        component: ZonaUsuarioComponent,
        canActivate: [AuthGuard],
      },
      { path: '**', redirectTo: 'home' },
    ],
  },
];
