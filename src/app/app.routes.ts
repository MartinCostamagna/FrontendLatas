import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Login } from './pages/login/login';
import { Listado } from './pages/listado/listado';
import { Lata } from './pages/lata/lata';
import { Estadistica } from './pages/estadistica/estadistica';
import { NuevaLata } from './pages/nueva-lata/nueva-lata';
import { Cajas } from './pages/cajas/cajas';
import { EdicionesEspeciales } from './pages/ediciones-especiales/ediciones-especiales';
import { Especialidades } from './pages/especialidades/especialidades';
import { Marcas } from './pages/marcas/marcas';
import { Paises } from './pages/paises/paises';
import { Tamanios } from './pages/tamanios/tamanios';
import { Sabores } from './pages/sabores/sabores';


export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'inicio'
    },
    { path: 'login', component: Login },

    { path: 'inicio', component: Inicio },

    { path: 'latas', component: Listado },
    { path: 'lata', component: Lata },

    { path: 'estadistica', component: Estadistica },

    { path: 'NuevaLata', component: NuevaLata },
    { path: 'Marcas', component: Marcas },
    { path: 'Tamaños', component: Tamanios },
    { path: 'Sabores', component: Sabores },
    { path: 'Especialidades', component: Especialidades },
    { path: 'EdicionesEspeciales', component: EdicionesEspeciales },
    { path: 'Paises', component: Paises },
    { path: 'Cajas', component: Cajas },
];
