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

    passwordVisible: boolean = false; // Controla la visibilidad de las contraseñas


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

    // Método para enviar el formulario de registro
  onRegister() {
    this.cargando = true;
    this.mensajeError = '';
    this.mensajeExito = '';
  
    // Validación de contraseñas
    if (!this.usuarioRequest.email || !this.usuarioRequest.password || this.usuarioRequest.password !== this.confirmPassword) {
      this.toastr.error( 'Las contraseñas no coinciden o faltan campos obligatorios.');
      this.cargando = false;
      return;
    }
  
    this.authService.register(this.usuarioRequest).subscribe(
      (response) => {
        this.cargando = false;
  
        if (response.codigo === 0) {
          this.toastr.success(response.mensaje || 'Usuario registrado con éxito');
          this.router.navigate(['/login']);  // Opcional: podrías redirigir después de un delay
        } else {
          this.toastr.error( response.mensaje || 'Hubo un error al registrar el usuario.');
        }
      },
      (error) => {
        this.cargando = false;
        this.toastr.error('Error del servidor: ' + (error.error?.mensaje || error.message || 'desconocido'));
      }
    );
  }

    submit() {
      this.generateSignature();
    }

    togglePasswordVisibility(): void {
      this.passwordVisible = !this.passwordVisible;
    }
  }
