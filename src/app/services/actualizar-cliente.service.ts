import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ActualizarCliente {
  correoElectronico: string;
  nombre: string;
  newName: string;
  apellido: string;
  nuevoCorreoElectronico: string;
  direccion: string;
  telefono: string;
  estado?: boolean;
  firma: string;
}

@Injectable({
  providedIn: 'root',
})
export class ActualizarClienteService {
  private apiUrl = 'http://localhost:8035/';

  constructor(private http: HttpClient) {}

  actualizarCliente(actualizar: ActualizarCliente): Observable<any> {
    return this.http.put(
      `${this.apiUrl}API/v1/Clientes/clienteController/updateCliente`,
      actualizar
    );
  }
}
