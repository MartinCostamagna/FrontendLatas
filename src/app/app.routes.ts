import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Login } from './pages/login/login';
import { Listado } from './pages/listado/listado';
import { LataDetalle } from './pages/lata/lata';
import { NuevaLata } from './pages/nueva-lata/nueva-lata';
import { Cajas } from './pages/cajas/cajas';
import { EdicionesEspeciales } from './pages/ediciones-especiales/ediciones-especiales';
import { Especialidades } from './pages/especialidades/especialidades';
import { Marcas } from './pages/marcas/marcas';
import { Paises } from './pages/paises/paises';
import { Tamanios } from './pages/tamanios/tamanios';
import { Sabores } from './pages/sabores/sabores';
import { Anios } from './pages/anios/anios';


export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'inicio'
    },
    { path: 'login', component: Login },

    { path: 'inicio', component: Inicio },

    { path: 'latas', component: Listado },
    { path: 'lata/:id', component: LataDetalle },

    { path: 'NuevaLata', component: NuevaLata },
    { path: 'Marcas', component: Marcas },
    { path: 'Tamaños', component: Tamanios },
    { path: 'Sabores', component: Sabores },
    { path: 'Especialidades', component: Especialidades },
    { path: 'EdicionesEspeciales', component: EdicionesEspeciales },
    { path: 'Paises', component: Paises },
    { path: 'Cajas', component: Cajas },
    { path: 'Años', component: Anios }
];
