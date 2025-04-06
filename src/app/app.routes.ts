import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';
import { ListarClientesComponent } from './components/listar-cliente/listar-cliente.component';
import { ActualizarClienteComponent } from './components/actualizar-cliente/actualizar-cliente.component';
import { NavbarComponent } from './components/navbar/navbar.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'crearCliente', component: CrearClienteComponent },
  {path: 'listarClientes', component:ListarClientesComponent},
  { path: 'actualizarCliente', component: ActualizarClienteComponent },
  {path:'navbar', component: NavbarComponent}
];
