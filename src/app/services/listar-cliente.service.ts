import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ListarClientesRequest {
  correoElectronico: string;
  fechaRegistroDesde: string | null;
  fechaRegistroHasta: string | null;
  pagina: number;
  tamanoPagina: number;
  firma: string;
}

export interface EliminarClienteRequest {
  nombre: string;
  correoElectronico: string;
  firma: string;
}

export interface ClienteListResponse {
  codigo: number;
  mensaje: string;
  clientes: any[];
  totalPaginas: number;
  totalElements: number;
}

@Injectable({
  providedIn: 'root',
})
export class ListarClientesService {
  private apiUrl = 'http://localhost:8035/';

  constructor(private http: HttpClient) {}

  listarCliente(request: ListarClientesRequest): Observable<ClienteListResponse> {
    return this.http.post<ClienteListResponse>(
      `${this.apiUrl}API/v1/Clientes/clienteController/listarCliente`, 
      request
    );
}

  eliminarCliente(request: EliminarClienteRequest): Observable<any> {
    return this.http.delete(`${this.apiUrl}API/v1/Clientes/clienteController/deleteCliente`, { body: request });
  }
}