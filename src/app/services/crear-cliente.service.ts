import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Cliente {
  nombre: string;
  apellido: string;
  correoElectronico: string;
  direccion: string;
  telefono: string;
  firma?: string;
}
@Injectable({
  providedIn: 'root',
})
export class CrearClienteService {
  private apiUrl = 'http://localhost:8035/';

  constructor(private http: HttpClient) {}

  crearCliente(cliente: Cliente): Observable<any> {
    return this.http.post(`${this.apiUrl}API/v1/Clientes/clienteController/crearCliente`, cliente);
  }
}
