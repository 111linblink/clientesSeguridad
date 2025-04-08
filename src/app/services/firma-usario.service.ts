import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface UsuarioFirma {
  email: string;
  password:string,
  estatus?: boolean | null;
}

export interface FirmaResponse {
  firma: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirmaUsarioService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'http://localhost:8035/';

  generarFirmaCrearCliente(usuarioFirma: UsuarioFirma): Observable<FirmaResponse> {
      return this.http.post<FirmaResponse>(
        `${this.apiUrl}firmaUsuario/generar-firma-usuario`, 
        usuarioFirma
      );
    }
}
