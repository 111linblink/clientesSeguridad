import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-mi-cuenta',
  imports: [],
  templateUrl: './mi-cuenta.component.html',
  styleUrl: './mi-cuenta.component.css'
})
export class MiCuentaComponent implements OnInit {
  userEmail: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Recuperar el correo desde sessionStorage
    this.userEmail = sessionStorage.getItem('userEmail');
    if (!this.userEmail) {
      // Si no hay correo (usuario no autenticado), redirigir al login
      this.authService.logout();
    }
  }
}
