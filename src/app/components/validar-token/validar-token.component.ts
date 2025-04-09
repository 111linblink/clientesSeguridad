import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-validar-token',
  imports: [CommonModule, FormsModule],
  templateUrl: './validar-token.component.html',
  styleUrl: './validar-token.component.css'
})
export class ValidarTokenComponent {
  token: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onValidar(): void {
    this.authService.validarToken(this.token).subscribe(
      (response) => {
        alert('Token validado con éxito.');
        this.router.navigate(['/restablecer-contrasena'], { queryParams: { token: this.token } });
      },
      (error) => {
        alert('Token inválido.');
      }
    );
  }

}
