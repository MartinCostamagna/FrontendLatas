import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Login } from './pages/login/login';
import { SeleccionarLista } from './pages/seleccionar-lista/seleccionar-lista';
import { Listado } from './pages/listado/listado';
import { Lata } from './pages/lata/lata';
import { Estadistica } from './pages/estadistica/estadistica';
import { NuevaLata } from './pages/nueva-lata/nueva-lata';
import { EditarLata } from './pages/editar-lata/editar-lata';
import { NuevaMarca } from './pages/nueva-marca/nueva-marca';
import { NuevoTamano } from './pages/nuevo-tamano/nuevo-tamano';
import { NuevoSabor } from './pages/nuevo-sabor/nuevo-sabor';
import { NuevaEspecialidad } from './pages/nueva-especialidad/nueva-especialidad';
import { NuevaEdEspecial } from './pages/nueva-ed-especial/nueva-ed-especial';
import { NuevoPais } from './pages/nuevo-pais/nuevo-pais';
import { NuevaCaja } from './pages/nueva-caja/nueva-caja';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'inicio'
    },
    { path: 'inicio', component: Inicio },
    { path: 'login', component: Login },
    { path: 'seleccionarLista', component: SeleccionarLista },
    { path: 'listado', component: Listado },
    { path: 'lata', component: Lata },
    { path: 'estadistica', component: Estadistica },
    { path: 'NuevaLata', component: NuevaLata },
    { path: 'EditarLata', component: EditarLata },
    { path: 'NuevaMarca', component: NuevaMarca },
    { path: 'NuevoTamano', component: NuevoTamano },
    { path: 'NuevoSabor', component: NuevoSabor },
    { path: 'NuevaEspecialidad', component: NuevaEspecialidad },
    { path: 'NuevaEdicionEspecial', component: NuevaEdEspecial },
    { path: 'NuevoPais', component: NuevoPais },
    { path: 'NuevaCaja', component: NuevaCaja },
];
