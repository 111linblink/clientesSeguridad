import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CrearFirmaListarClientes {
  correoElectronico: string;
  fechaRegistroDesde: string | null;
  fechaRegistroHasta: string | null;
  pagina: number;
  tamanoPagina: number;
}

export interface FirmaEliminarRequest {
  correoElectronico: string;
  nombre: string;
}

export interface FirmaResponse {
  firma: string;
}

export interface ClienteFirma {
  nombre: string;
  newName: string;
  apellido: string;
  correoElectronico: string;
  nuevoCorreoElectronico: string;
  telefono: string;
  direccion: string;
  estado?: boolean | null;
}

@Injectable({
  providedIn: 'root'
})
export class FirmaService {
  private apiUrl = 'http://localhost:8035/';

  constructor(private http: HttpClient) {}

  generarFirmaListarCliente(request: CrearFirmaListarClientes): Observable<FirmaResponse> {
    return this.http.post<FirmaResponse>(
      `${this.apiUrl}firma/generar-firma-paginado`,
      request
    );
  }

  generarFirmaEliminarCliente(request: FirmaEliminarRequest): Observable<FirmaResponse> {
    return this.http.post<FirmaResponse>(
      `${this.apiUrl}firma/generarFirmaEliminar`,
      request
    );
  }

  generarFirmaCrearCliente(clienteFirma: ClienteFirma): Observable<FirmaResponse> {
    return this.http.post<FirmaResponse>(
      `${this.apiUrl}firma/generarFirmaCrear`, 
      clienteFirma
    );
  }

  generarFirmaActualizarCliente(clienteFirma: ClienteFirma): Observable<FirmaResponse> {
    return this.http.post<FirmaResponse>(
      `${this.apiUrl}firma/generarFirmaActualizar`, 
      clienteFirma
    );
  }
}