import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActualizarClienteService } from '../../services/actualizar-cliente.service';
import { FirmaService } from '../../services/firma.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-actualizar-cliente',
  imports: [CommonModule, FormsModule],
  templateUrl: './actualizar-cliente.component.html',
  styleUrls: ['./actualizar-cliente.component.css'],
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
  
  mostrarModal = false;
  mostrarModal2 =false;
  clienteActualizado: any = null;


  constructor(
    private firmaService: FirmaService,
    private actualizarClienteService: ActualizarClienteService
  ) {}

  // Método para cargar los datos del cliente en el formulario
  cargarDatosCliente() {
    if (this.correoElectronico) {
      this.actualizarClienteService.obtenerClientePorCorreo(this.correoElectronico).subscribe(
        (cliente) => {
          if (cliente) {
            // Si el cliente es encontrado, llenar los campos con sus datos
            this.nombre = cliente.nombre;
            this.apellido = cliente.apellido;
            this.telefono = cliente.telefono;
            this.direccion = cliente.direccion;
            this.estado = cliente.estado;
          } else {
            alert('No se encontró un cliente con ese correo electrónico.');
          }
        },
        (error) => {
          console.error('Error al cargar los datos del cliente:', error);
          alert('Error al cargar los datos del cliente');
        }
      );
    }
  }

  onSubmit() {
    const actualizarCli = {
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

    const firmaActualizar = {
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

        // Actualizar cliente
        this.actualizarClienteService.actualizarCliente(actualizarCli).subscribe(
          (response) => {
            this.clienteActualizado = { ...actualizarCli };
            this.mostrarModal = true;
          },
          (error) => {
            this.mostrarModal2 = true;
          }
        );
      },
      (error) => {
        alert('Error al generar la firma de actualización: ' + JSON.stringify(error, null, 2));
      }
    );
  }
}
