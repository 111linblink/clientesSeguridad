import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8035/API/v1/USUARIOS/usuariosController'; 
  private authApiUrl = 'http://localhost:8035/api/auth'; // Nueva URL para autenticación

  constructor(private http: HttpClient, private router : Router) { }

  // Método para iniciar sesión
  login(usuariosRequest: any): Observable<string> {
    return this.http.post<string>(`${this.authApiUrl}/login`, usuariosRequest, { responseType: 'text' as 'json' }).pipe(
      catchError((error) => {
        return throwError('Hubo un error al intentar iniciar sesión');
      })
    );
  }
  

  // Método para recuperar la contraseña
  recuperarContrasena(usuariosRequest: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/recuperarContrasena`, usuariosRequest);
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
      }),
      tap((token: string) => {
        this.setToken(token); // Guarda el token cuando la autenticación es exitosa
      })
    );
  }

  //Verificar autenticación
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

    // Método para cerrar sesión
    logout(): void {
      sessionStorage.removeItem('token'); // Eliminar el token del sessionStorage
      console.log('Token eliminado, redirigiendo al login...'); // Depuración
      
      // Forzar una actualización de la UI
      setTimeout(() => {
        this.router.navigate(['/login']).then((success) => {
          if (success) {
            console.log('Redirección al login exitosa.'); // Depuración
          } else {
            console.error('Error al redirigir al login.'); // Depuración
          }
        });
      }, 100); // Esperar un poco para que el cambio en sessionStorage se refleje
    }
    

    setToken(token: string): void {
      sessionStorage.setItem('token', token); // Guardar el token en sessionStorage
      console.log('Token guardado en sessionStorage:', token); // Depuración
    }

        // Método para obtener el token desde el localStorage
    getToken(): string | null {
      return sessionStorage.getItem('token'); // Obtener el token desde sessionStorage
    }

  getUsuario(): any {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token); // Decodifica el token
        return {
          email: decodedToken.email,
        };
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
      }
    }
    return null;
  }
  
  
  
}
