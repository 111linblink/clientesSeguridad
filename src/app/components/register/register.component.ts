import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirmaUsarioService } from '../../services/firma-usario.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  usuarioRequest = { 
    email: '', 
    password: '', 
    estatus: true, 
    firma: '' 
  };  // Campo 'firma' sin el confirmPassword
  confirmPassword: string = '';  // Creamos una variable para confirmPassword solo para validación
  mensajeError: string = '';
  mensajeExito: string = '';
  cargando: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private firmaUsuarioService: FirmaUsarioService
  ) { }

  // Método para generar la firma
  generateSignature() {
    const usuarioFirma = {
      email: this.usuarioRequest.email,
      password: this.usuarioRequest.password,
      estatus: this.usuarioRequest.estatus
    };

    this.firmaUsuarioService.generarFirmaCrearCliente(usuarioFirma).subscribe(
      (response) => {
        if (response.firma) {
          this.usuarioRequest.firma = response.firma;
          this.onRegister();
        } else {
          this.mensajeError = 'Error al generar la firma.';
        }
      },
      (error) => {
        this.mensajeError = 'Hubo un error al generar la firma';
      }
    );
  }

  // Método para enviar el formulario de registro
  onRegister() {
    this.cargando = true;

    // Validación de contraseñas
    if (!this.usuarioRequest.email || !this.usuarioRequest.password || this.usuarioRequest.password !== this.confirmPassword) {
      this.mensajeError = 'Las contraseñas no coinciden o faltan campos obligatorios.';
      this.cargando = false;
      return;
    }

    this.authService.register(this.usuarioRequest).subscribe(
      (response) => {
        this.cargando = false;

        if (response.codigo === 0) {
          this.mensajeExito = 'Usuario registrado con éxito. Por favor, inicia sesión.';
          this.router.navigate(['/login']);
        } else {
          this.mensajeError = response.mensaje || 'Hubo un error al registrar el usuario';
        }
      },
      (error) => {
        this.cargando = false;
        this.mensajeError = 'Hubo un error al intentar registrar el usuario: ' + (error.message || 'error desconocido');
      }
    );
  }

  submit() {
    this.generateSignature(); // Primero generamos la firma
  }
}

