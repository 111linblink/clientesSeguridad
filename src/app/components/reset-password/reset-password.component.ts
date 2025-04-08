import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  email: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRecuperar(): void {
    this.authService.recuperarContrasena(this.email).subscribe(
      (response) => {
        alert('Correo enviado con el token para recuperar la contraseña.');
        this.router.navigate(['/validar-token']);  // Redirigir a la página de validación de token
      },
      (error) => {
        alert('Hubo un error al enviar el correo.');
      }
    );
  }
}
