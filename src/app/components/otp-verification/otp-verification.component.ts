import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent {
  email: string = '';
  telefono: string = '';
  otp: string = '';
  canal: string = '';
  cargando: boolean = false; // <-- Añade esta variable
  mensajeError: string = ''; // <-- Para mostrar errores en el template
  mensajeExito: string = ''; // <-- Para mensajes de éxito

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.canal = params['canal'];
      this.email = params['email'] || '';
      this.telefono = params['telefono'] || '';

      if (!this.canal || (this.canal === 'email' && !this.email) || (this.canal === 'sms' && !this.telefono)) {
        this.toastr.error('Faltan datos para verificar el OTP. Redirigiendo...');
        this.router.navigate(['/login']);
      }
    });
  }

  verificarOTP() {
    if (this.cargando) return; // Evita múltiples envíos
    
    this.cargando = true; // <-- Activa el estado de carga
    this.mensajeError = ''; // Limpia mensajes anteriores
    
    const otpRequest = {
      email: this.email,
      otp: this.otp
    };

    this.authService.verificarCodigo2FA(otpRequest).subscribe({
      next: (response) => {
        this.cargando = false; // <-- Desactiva carga
        this.mensajeExito = 'Verificación exitosa!';
        this.toastr.success('Autenticación exitosa');
        // Redirige después de 2 segundos para que se vea el mensaje
        setTimeout(() => {
          this.router.navigate(['/']); // Ajusta la ruta
        }, 2000);
      },
      error: (err) => {
        this.cargando = false; // <-- Desactiva carga incluso en error
        this.mensajeError = 'Código OTP incorrecto o expirado';
        this.toastr.error('Código OTP incorrecto o expirado');
        console.error('Error en verificación OTP:', err);
      }
    });
  }

 
}