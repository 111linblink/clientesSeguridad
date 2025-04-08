import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';
import { ListarClientesComponent } from './components/listar-cliente/listar-cliente.component';
import { ActualizarClienteComponent } from './components/actualizar-cliente/actualizar-cliente.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { RecuperarContrasenaComponent } from './components/recuperar-contrasena/recuperar-contrasena.component';
import { OtpVerificationComponent } from './components/otp-verification/otp-verification.component';
import { SeleccionarCanalComponent } from './components/seleccionar-canal/seleccionar-canal.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'crearCliente', component: CrearClienteComponent },
  {path: 'listarClientes', component:ListarClientesComponent},
  { path: 'actualizarCliente', component: ActualizarClienteComponent },
  { path:'registro', component:RegisterComponent},
  { path:'login', component:LoginComponent},
  { path:'recuperar-contrasena', component:RecuperarContrasenaComponent},
  { path:'verificar-otp', component:OtpVerificationComponent},
  { path:'seleccionar-canal', component:SeleccionarCanalComponent}
];
