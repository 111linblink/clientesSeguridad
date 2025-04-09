import { Component, ElementRef, ViewChild, HostListener  } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {AuthService} from '../../services/auth.service';
import { Collapse } from 'bootstrap';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef;
  private bsCollapse: Collapse | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  // Método para cerrar el menú colapsable
  closeNavbar() {
    if (this.bsCollapse) {
      this.bsCollapse.hide();
    }
  }

  toggleNavbar() {
    if (!this.bsCollapse) {
      this.bsCollapse = new Collapse(this.navbarCollapse.nativeElement, { toggle: false });
    }
    this.bsCollapse.toggle();
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  // Cerrar sesión
  logout(): void {
    this.authService.logout(); // Llama al método logout de AuthService
  }

  // Obtener correo del usuario desde el token
  getUserEmail(): string | null {
    const user = this.authService.getUsuario();
    return user ? user.email : null;
  }
}