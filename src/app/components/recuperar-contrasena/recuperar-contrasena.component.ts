import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recuperar-contrasena',
  imports: [FormsModule, CommonModule],
  templateUrl: './recuperar-contrasena.component.html',
  styleUrl: './recuperar-contrasena.component.css'
})
export class RecuperarContrasenaComponent {
  usuarioRequest = { email: '' }; 
  mensaje: string = '';

  constructor(private authService: AuthService) { }

  // Método para enviar la solicitud de recuperación de contraseña
  onRecuperarContrasena() {
    if (!this.usuarioRequest.email) {
        this.mensaje = 'Por favor, ingresa un correo electrónico válido.';
        return;
    }

    this.authService.recuperarContrasena(this.usuarioRequest.email).subscribe(
        response => {
          console.log('Correo de recuperación enviado', response);
        },
        error => {
          console.error('Error al enviar correo de recuperación', error);
        }
      );
      
}


}
