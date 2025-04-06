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
  nombre = '';
  newName = '';
  apellido = '';
  correoElectronico = '';
  nuevoCorreoElectronico = '';
  telefono = '';
  direccion = '';
  estado?: boolean;
  firma = '';

  constructor(
    private firmaService: FirmaService,
    private actualizarClienteService: ActualizarClienteService
  ) {}

  onSubmit() {
    const actualizarCli: ActualizarCliente = {
      nombre: this.nombre,
      newName: this.newName,
      apellido: this.apellido,
      correoElectronico: this.correoElectronico, 
      nuevoCorreoElectronico: this.nuevoCorreoElectronico,
      telefono: this.telefono,
      direccion: this.direccion,
      estado: this.estado,
      firma: this.firma,
    };

    const firmaActualizar: ClienteFirma = {
      nombre: this.nombre,
      newName: this.newName,
      apellido: this.apellido,
      correoElectronico: this.correoElectronico,
      nuevoCorreoElectronico: this.nuevoCorreoElectronico,
      telefono: this.telefono,
      direccion: this.direccion,
      estado: this.estado,
    };

    this.firmaService.generarFirmaActualizarCliente(firmaActualizar).subscribe(
      (firmaGenerada) => {
        actualizarCli.firma = firmaGenerada.firma;

        alert('Formulario para actualizar el cliente');
        alert('Formulario para firma del cliente');

        //Actualizar cliente
        this.actualizarClienteService
          .actualizarCliente(actualizarCli)
          .subscribe(
            (response) => {
              alert('Cliente actualizado con éxito');
            },
            (error) => {
              alert('Error al actualizar el cliente');
            }
          );
      },
      (error) => {
        alert('Error al generar la firma de actualización: ' + JSON.stringify(error, null, 2));
      }
    );
  }
}