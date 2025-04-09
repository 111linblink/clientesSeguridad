import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8035/API/v1/USUARIOS/usuariosController'; 
  private authApiUrl = 'http://localhost:8035/api/auth'; // Nueva URL para autenticación
  private resApiUrl='http://localhost:8035/api/usuarios'

  constructor(private http: HttpClient) { }

  // Método para iniciar sesión
  login(usuariosRequest: any): Observable<string> {
    return this.http.post<string>(`${this.authApiUrl}/login`, usuariosRequest, { responseType: 'text' as 'json' }).pipe(
      catchError((error) => {
        // Manejo de errores para proporcionar un mensaje más claro en caso de que falle
        return throwError('Hubo un error al intentar iniciar sesión');
      })
    );
  }

  register(usuarioRequest: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/crearUsuario`, usuarioRequest);
  }

  // Método para enviar el OTP
  enviarOtp(usuariosRequest: any): Observable<any> {
    return this.http.post(`${this.authApiUrl}/enviar-otp`, usuariosRequest, { responseType: 'text' }); // Aquí usamos el endpoint adecuado
  }

  // Método para verificar el OTP
  verificarCodigo2FA(otpRequest: any): Observable<any> {
    return this.http.post(`${this.authApiUrl}/verificar-otp`, { email: otpRequest.email, otp: otpRequest.otp }, { responseType: 'text' }).pipe(
      catchError((error) => {
        return throwError('Hubo un error al intentar verificar el OTP');
      })
    );
  }

  recuperarContrasena(email: string): Observable<any> {
    return this.http.post(`${this.resApiUrl}/recuperar-contrasena`, { email });
  }

  // Validar token de recuperación
  validarToken(token: string): Observable<any> {
    return this.http.post(`${this.resApiUrl}/validar-token`, { token });
  }

  // Restablecer la contraseña
    restablecerContrasena(token: string, nuevaContrasena: string): Observable<any> {
      return this.http.post(`${this.resApiUrl}/restablecer-contrasena`, { token, nuevaContrasena });
    }
  
  
  
  
}
