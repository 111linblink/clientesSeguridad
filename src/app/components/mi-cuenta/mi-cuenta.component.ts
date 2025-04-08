import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-mi-cuenta',
  imports: [CommonModule],
  templateUrl: './mi-cuenta.component.html',
  styleUrl: './mi-cuenta.component.css'
})
export class MiCuentaComponent {
  usuario: any = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.obtenerDatosUsuario();
  }

  obtenerDatosUsuario() {
    this.usuario = this.authService.getUsuario(); 
    console.log('Datos del usuario:', this.usuario); 
  }

  cerrarSesion() {
    this.authService.logout();
    this.usuario = null;
  }
}
