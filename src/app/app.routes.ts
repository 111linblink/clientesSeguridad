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
import { NavbarComponent } from './components/navbar/navbar.component';
import { MiCuentaComponent } from './components/mi-cuenta/mi-cuenta.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: InicioComponent, canActivate: [authGuard]},
  { path: 'crearCliente', component: CrearClienteComponent, canActivate: [authGuard]},
  {path: 'listarClientes', component:ListarClientesComponent, canActivate: [authGuard]},
  { path: 'actualizarCliente', component: ActualizarClienteComponent, canActivate: [authGuard]},
  {path:'navbar', component: NavbarComponent},
  { path:'registro', component:RegisterComponent},
  { path:'login', component:LoginComponent},
  { path:'recuperar-contrasena', component:RecuperarContrasenaComponent},
  { path:'verificar-otp', component:OtpVerificationComponent},
  { path:'seleccionar-canal', component:SeleccionarCanalComponent},
  {path:'micuenta', component:MiCuentaComponent, canActivate: [authGuard]}
];
