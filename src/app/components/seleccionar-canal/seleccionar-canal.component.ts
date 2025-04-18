import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seleccionar-canal',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './seleccionar-canal.component.html',
  styleUrl: './seleccionar-canal.component.css'
})
export class SeleccionarCanalComponent {
  email: string = '';
  canal: string = ''; // 'correo' o 'sms'
  telefono: string = ''; // Solo si se selecciona SMS

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }

  seleccionarCanal() {
    if (!this.canal) {
      this.toastr.warning('Por favor, selecciona un canal para recibir el OTP.');
      return;
    }
  
    if (this.canal === 'sms' && !this.telefono) {
      this.toastr.warning('Por favor, ingresa tu número de teléfono para el canal SMS.');
      return;
    }
  
    const otpRequest = {
      email: this.email,
      telefono: this.canal === 'sms' ? this.telefono : '',  // Solo se envía si el canal es SMS
      canal: this.canal
    };
  
    this.authService.enviarOtp(otpRequest).subscribe({
      next: (response) => {
        console.log(response);  // Asegúrate de que esta línea imprima lo esperado
        this.toastr.success(response); // Mostrar mensaje de éxito
        // Aquí revisa si la redirección es correcta para SMS
        if (this.canal === 'sms') {
          this.router.navigate(['/verificar'], { queryParams: { email: this.email, canal: this.canal } });
        } else {
          // Redirige al flujo de correo
          this.router.navigate(['/verificar'], { queryParams: { email: this.email, canal: this.canal } });
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Error al enviar OTP: ' + (err.error ? err.error : err.message));
      }
    });
    
    
    
    
  }
  
  
}
