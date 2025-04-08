import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';
import { ListarClientesComponent } from './components/listar-cliente/listar-cliente.component';
import { ActualizarClienteComponent } from './components/actualizar-cliente/actualizar-cliente.component';
<<<<<<<<< Temporary merge branch 1
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { RecuperarContrasenaComponent } from './components/recuperar-contrasena/recuperar-contrasena.component';
import { OtpVerificationComponent } from './components/otp-verification/otp-verification.component';
import { SeleccionarCanalComponent } from './components/seleccionar-canal/seleccionar-canal.component';
=========
import { NavbarComponent } from './components/navbar/navbar.component';
>>>>>>>>> Temporary merge branch 2

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'crearCliente', component: CrearClienteComponent },
  {path: 'listarClientes', component:ListarClientesComponent},
  { path: 'actualizarCliente', component: ActualizarClienteComponent },
<<<<<<<<< Temporary merge branch 1
  { path:'registro', component:RegisterComponent},
  {path:'navbar', component: NavbarComponent}
  { path:'login', component:LoginComponent},
  { path:'recuperar-contrasena', component:RecuperarContrasenaComponent},
  { path:'verificar-otp', component:OtpVerificationComponent},
  { path:'seleccionar-canal', component:SeleccionarCanalComponent}
];

;
