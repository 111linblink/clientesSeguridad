import { Component, HostListener, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; // Importamos ToastrService

@Component({
  selector: 'app-mi-cuenta',
  imports: [CommonModule, FormsModule],
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {
  userEmail: string | null = null;
  nuevaContrasena: string = '';
  confirmacionContrasena: string = '';
  cambiarContrasenaHabilitado: boolean = false; // Controla la visibilidad del formulario
  passwordVisible: boolean = false; // Controla la visibilidad de las contraseñas


  @ViewChild('formContainer') formContainer: ElementRef | undefined; // Referencia al contenedor del formulario

  constructor(private authService: AuthService, private toastr: ToastrService) {}

  ngOnInit(): void {
    // Recuperar el correo desde sessionStorage
    this.userEmail = sessionStorage.getItem('userEmail');
    if (!this.userEmail) {
      // Si no hay correo (usuario no autenticado), redirigir al login
      this.authService.logout();
    }
  }

  // Método para habilitar el formulario de cambio de contraseña
  habilitarCambioContrasena(): void {
    this.cambiarContrasenaHabilitado = true;
  }

  // Método para manejar el cambio de contraseña
  cambiarContrasena(): void {
    // Verificar que las contraseñas coinciden
    if (this.nuevaContrasena !== this.confirmacionContrasena) {
      this.toastr.error("Las contraseñas no coinciden. Inténtalo de nuevo.", "Error"); // Mostrar mensaje de error
      return;
    }

    // Verificar token antes de enviarlo
    const token = sessionStorage.getItem('token');
    console.log('Token antes de enviar:', token);  // Asegúrate de que el token está aquí

    // Llamar al servicio para actualizar la contraseña
    if (this.userEmail && token) {
      this.authService.cambiarContrasena(this.nuevaContrasena).subscribe(
        response => {
          // Aquí procesamos la respuesta exitosa del backend
          console.log('Respuesta del backend:', response);
          this.toastr.success("Contraseña cambiada con éxito."); // Mostrar mensaje de éxito
          this.cambiarContrasenaHabilitado = false; // Deshabilitar el formulario después de la actualización
        },
        error => {
          // Aquí procesamos los errores
          console.error('Error al cambiar la contraseña:', error);
          this.toastr.error("Hubo un error al actualizar la contraseña.", "Error"); // Mostrar mensaje de error
        }
      );
    }
  }

  // Detectar clic en el documento
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const formContainer = document.querySelector('.change-password-container');
    if (formContainer && !formContainer.contains(event.target as Node)) {
      this.limpiarCampos(); // Limpiar campos si el clic es fuera del formulario
    }
  }

  // Método para limpiar los campos y ocultar el formulario
  limpiarCampos(): void {
    this.nuevaContrasena = '';
    this.confirmacionContrasena = '';
    this.cambiarContrasenaHabilitado = false;
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
