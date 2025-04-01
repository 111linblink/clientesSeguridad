import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ListarClientes {
  correoElectronico: string;
  fechaRegistroInicio: string | null; // Permitir null
  fechaRegistroFin: string | null; // Permitir null
  estatus: boolean;
  pagina: number;
  tamanoPagina: number;
  firma: string;
}

export interface EliminarCliente {
  correo_electronico: string;
  firma: string;
}

@Injectable({
  providedIn: 'root',
})
export class ListarClientesService {
  private apiUrl = 'http://localhost:8035/';

  constructor(private http: HttpClient) {}

  listarCliente(listarCliente: ListarClientes): Observable<any> {
    // Crear los parámetros para la URL
    let params = new HttpParams()
      .set('correoElectronico', listarCliente.correoElectronico)
      .set('fechaRegistroInicio', listarCliente.fechaRegistroInicio ?? '')
      .set('fechaRegistroFin', listarCliente.fechaRegistroFin ?? '')
      .set('estatus', listarCliente.estatus.toString())
      .set('pagina', listarCliente.pagina.toString())
      .set('tamanoPagina', listarCliente.tamanoPagina.toString())
      .set('firma', listarCliente.firma);

    // Hacer la solicitud GET con los parámetros
    return this.http.get<any>(`${this.apiUrl}API/v1/clientes/listarClientes`, {
      params,
    });
  }

  eliminarCliente(eliminarCliente: EliminarCliente): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/API/v1/clientes/eliminar`, {
      body: eliminarCliente,
    });
  }
}
