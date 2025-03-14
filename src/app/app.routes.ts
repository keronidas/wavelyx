import { Routes } from '@angular/router';
import { HomeComponent } from './pages/clients/home/home.component';
import { ConfiguradorComponent } from './pages/clients/configurador/configurador.component';
import { PoliticasComponent } from './pages/clients/politicas/politicas.component';
import { CatalogoComponent } from './pages/clients/catalogo/catalogo.component';
import { ZonaUsuarioComponent } from './pages/clients/zona-usuario/zona-usuario.component';
import { LayoutComponent } from './pages/clients/layout/layout.component';
import { WorkersLayoutComponent } from './pages/workers/workers-layout/workers-layout.component';

export const routes: Routes = [
    {
        path: '', component: LayoutComponent, children: [
            { path: 'home', component: HomeComponent },
            { path: 'configurador', component: ConfiguradorComponent },
            { path: 'catalogo', component: CatalogoComponent },
            { path: 'politica-privacidad', component: PoliticasComponent },
            { path: 'zona-usuarios', component: ZonaUsuarioComponent },
            { path: '**', redirectTo: 'home' }
        ]
    },
    { path: 'workers', component: WorkersLayoutComponent, children: [] }
];
