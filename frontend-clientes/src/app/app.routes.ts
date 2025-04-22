import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ConfiguradorComponent } from './pages/configurador/configurador.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { ZonaUsuarioComponent } from './pages/zona-usuario/zona-usuario.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { BioProductsComponent } from './pages/bio-products/bio-products.component';
import { LoginUserComponent } from './pages/login-user/login-user.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';

export const routes: Routes = [{ path: 'auth', loadChildren: () => import('./auth/auth.routes') },
{
  path: '',
  component: LayoutComponent,
  children: [
    { path: 'home', component: HomeComponent },
    { path: 'configurador', component: ConfiguradorComponent },
    { path: 'catalogo-electronico', component: CatalogoComponent },
    { path: 'productos-biodegradables', component: BioProductsComponent },
    // { path: 'login', component: LoginUserComponent },
    // { path: 'register', component: RegisterUserComponent },
    { path: 'zona-usuario', component: ZonaUsuarioComponent },
    { path: '**', redirectTo: 'home' },
  ],
},
];
