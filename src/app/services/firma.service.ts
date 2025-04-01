import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CrearFirmaListarClientes {
  correoElectronico: string;
  fechaRegistroInicio: string | null; // Permitir null
  fechaRegistroFin: string | null; // Permitir null
  estatus: boolean;
  pagina: number;
  tamanoPagina: number;
}

export interface ClienteFirma {
  nombre: string;
  apellido: string;
  correoActual: string;
  nuevoCorreo: string;
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

  generarFirmaListarCliente(
    listaFirma: CrearFirmaListarClientes
  ): Observable<any> {
    return this.http.post<string>(
      `${this.apiUrl}firma/generar-firma-paginado`,
      listaFirma
    );
  }

  generarFirmaCrearCliente(clienteFirma: ClienteFirma): Observable<any> {
      return this.http.post<string>(`${this.apiUrl}firma/generar-firma`, clienteFirma);
    }
}
