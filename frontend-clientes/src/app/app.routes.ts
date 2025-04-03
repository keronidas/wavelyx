import { Routes } from '@angular/router';
import { HomeComponent } from './pages/clients/home/home.component';
import { ConfiguradorComponent } from './pages/clients/configurador/configurador.component';
import { PoliticasComponent } from './pages/clients/politicas/politicas.component';
import { CatalogoComponent } from './pages/clients/catalogo/catalogo.component';
import { ZonaUsuarioComponent } from './pages/clients/zona-usuario/zona-usuario.component';
import { LayoutComponent } from './pages/clients/layout/layout.component';
import { BioProductsComponent } from './pages/clients/bio-products/bio-products.component';

export const routes: Routes = [
    {
        path: '', component: LayoutComponent, children: [
            { path: 'home', component: HomeComponent },
            { path: 'configurador', component: ConfiguradorComponent },
            { path: 'catalogo-electronico', component: CatalogoComponent },
            { path: 'productos-biodegradables', component: BioProductsComponent },
            { path: 'politica-privacidad', component: PoliticasComponent },
            { path: 'zona-usuarios', component: ZonaUsuarioComponent },
            { path: '**', redirectTo: 'home' }
        ]
    },
    
];
