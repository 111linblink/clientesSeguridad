  import { Component } from '@angular/core';
  import { AuthService } from '../../services/auth.service';
  import { Router } from '@angular/router';
  import { CommonModule } from '@angular/common';
  import { FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
  import { FirmaUsarioService } from '../../services/firma-usario.service';
  import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

  @Component({
    selector: 'app-register',
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
  })
  export class RegisterComponent {
    usuarioRequest = { 
      email: '', 
      password: '', 
      estatus: true, 
      firma: '' 
    };
    confirmPassword: string = '';
    mensajeError: string = '';
    mensajeExito: string = '';
    cargando: boolean = false;
    passwordPattern = '^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$';

    // Validador de contraseña (min 8 caracteres, al menos 1 mayúscula, 1 número, 1 carácter especial)
    passwordPatternValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const password = control.value;
        const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return password && !passwordPattern.test(password) ? { 'passwordPattern': true } : null;
      };
    }

    constructor(
      private authService: AuthService,
      private router: Router,
      private toastr: ToastrService,
      private firmaUsuarioService: FirmaUsarioService
    ) { }

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

    onRegister() {
      this.cargando = true;

      if (!this.usuarioRequest.email || !this.usuarioRequest.password || this.usuarioRequest.password !== this.confirmPassword) {
        this.mensajeError = 'Las contraseñas no coinciden o faltan campos obligatorios.';
        this.toastr.error('Las contraseñas no coinciden o faltan campos obligatorios');
        this.cargando = false;
        return;
      }

      this.authService.register(this.usuarioRequest).subscribe(
        (response) => {
          this.cargando = false;

          if (response.codigo === 0) {
            this.mensajeExito = 'Usuario registrado con éxito. Por favor, inicia sesión.';
            this.toastr.success('Usuario registrado con éxito.');
            this.router.navigate(['/login']);
          } else {
            this.mensajeError = response.mensaje || 'Hubo un error al registrar el usuario';
            this.toastr.error('Usuario no registrado.');
          }
        },
        (error) => {
          this.cargando = false;
          this.mensajeError = 'Hubo un error al intentar registrar el usuario: ' + (error.message || 'error desconocido');
        }
      );
    }

    submit() {
      this.generateSignature();
    }
  }
