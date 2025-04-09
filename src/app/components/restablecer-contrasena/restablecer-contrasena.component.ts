import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-restablecer-contrasena',
  imports: [FormsModule],
  templateUrl: './restablecer-contrasena.component.html',
  styleUrl: './restablecer-contrasena.component.css'
})
export class RestablecerContrasenaComponent implements OnInit {
  nuevaContrasena: string = '';
  token: string = '';  // Token vacío inicialmente

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private route: ActivatedRoute // Inyectar ActivatedRoute para obtener parámetros de la URL
  ) {}

  ngOnInit(): void {
    // Obtener el token desde la URL cuando el componente se inicializa
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];  // Asignar el valor del token de los parámetros de la URL
      console.log("Token recibido desde la URL:", this.token); // Verificar en consola
    });
  }

  onRestablecer(): void {
    if (!this.token) {
      alert("El token no está presente.");
      return;
    }

    console.log("Token:", this.token); // Asegúrate de que el token no está vacío
    this.authService.restablecerContrasena(this.token, this.nuevaContrasena).subscribe(
      (response) => {
        if (response.codigo === 0) {
          alert('Contraseña restablecida con éxito.');
          this.router.navigate(['/login']);
        } else {
          alert('Error al restablecer la contraseña: ' + response.mensaje);
        }
      },
      (error) => {
        console.error('Error al restablecer la contraseña:', error);
        alert('Error al restablecer la contraseña.');
      }
    );
  }
}
