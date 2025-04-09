import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastrModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) {}

  login() {
    const usuarioRequest = { email: this.email, password: this.password };

    this.authService.login(usuarioRequest).subscribe({
      next: (response) => {
        this.toastr.success('Login exitoso');
        this.router.navigate(['/seleccionar-canal'], { queryParams: { email: this.email } });
      },
      error: (err) => {
        this.toastr.error('Error en el login: ' + err.error);
      }
    });
  }
}
