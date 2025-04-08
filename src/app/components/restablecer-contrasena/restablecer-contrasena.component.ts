import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-restablecer-contrasena',
  imports: [FormsModule],
  templateUrl: './restablecer-contrasena.component.html',
  styleUrl: './restablecer-contrasena.component.css'
})
export class RestablecerContrasenaComponent {
  nuevaContrasena: string = '';
  token: string = '';  // Asegúrate de obtener el token de alguna manera (por ejemplo, desde la URL)

  constructor(private authService: AuthService, private router: Router) {}

  onRestablecer(): void {
    this.authService.restablecerContrasena(this.token, this.nuevaContrasena).subscribe(
      (response) => {
        alert('Contraseña restablecida con éxito.');
        this.router.navigate(['/login']);  // Redirigir al login
      },
      (error) => {
        alert('Error al restablecer la contraseña.');
      }
    );
  }

}
