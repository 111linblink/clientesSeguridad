import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActualizarCliente, ActualizarClienteService } from '../../services/actualizar-cliente.service';
import { ClienteFirma, FirmaService } from '../../services/firma.service';

@Component({
  selector: 'app-actualizar-cliente',
  imports: [CommonModule, FormsModule],
  templateUrl: './actualizar-cliente.component.html',
  styleUrl: './actualizar-cliente.component.css',
})
export class ActualizarClienteComponent {
  correoActual = '';
  nombre = '';
  apellido = '';
  nuevoCorreo = '';
  direccion = '';
  telefono = '';
  estado?: boolean;
  firma = '';

  constructor(
    private firmaService: FirmaService,
    private actualizarClienteService: ActualizarClienteService
  ) {}

  onSubmit() {
    const actualizarCli: ActualizarCliente = {
      correoActual: this.correoActual,
      nombre: this.nombre,
      apellido: this.apellido,
      nuevoCorreo: this.nuevoCorreo,
      direccion: this.direccion,
      telefono: this.telefono,
      estado: this.estado,
      firma: this.firma,
    };

    const firmaActualizar: ClienteFirma = {
      correoActual: this.correoActual,
      nombre: this.nombre,
      apellido: this.apellido,
      nuevoCorreo: this.nuevoCorreo,
      direccion: this.direccion,
      telefono: this.telefono,
      estado: this.estado,
    };

    this.firmaService.generarFirmaCrearCliente(firmaActualizar).subscribe(
      (firmaGenerada) => {
        actualizarCli.firma = firmaGenerada.firma;

        console.log('Formulario para actualizar el cliente: ',actualizarCli)
        console.log('Formulario para firma del cliente: ',firmaActualizar)

        //Actualizar cliente
        this.actualizarClienteService
          .actualizarCliente(actualizarCli)
          .subscribe(
            (response) => {
              console.log('Cliente actualizado ', response);
            },
            (error) => {
              console.error('Error al actualizar el cliente: ', error);
            }
          );
      },
      (error) => {
        console.error('Error al generar la firma de actualización');
      }
    );
  }
}
