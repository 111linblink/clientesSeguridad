import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActualizarCliente, ActualizarClienteService } from '../../services/actualizar-cliente.service';
import { ClienteFirma, FirmaService } from '../../services/firma.service';
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-actualizar-cliente',
  imports: [CommonModule, FormsModule],
  templateUrl: './actualizar-cliente.component.html',
  styleUrls: ['./actualizar-cliente.component.css'],
})
export class ActualizarClienteComponent implements OnInit {
  nombre = '';
  newName = '';
  apellido = '';
  correoElectronico = '';
  nuevoCorreoElectronico = '';
  telefono = '';
  direccion = '';
  estado?: boolean;
  firma = '';
  clienteActualizado: ActualizarCliente | null = null; // Almacena los datos actualizados
  private correoSubject: Subject<string> = new Subject(); // Subject para el debounce

  constructor(
    private firmaService: FirmaService,
    private actualizarClienteService: ActualizarClienteService,
    private clienteService: ActualizarClienteService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.correoSubject.pipe(
      debounceTime(500), // Espera 500ms después de que el usuario termine de escribir
      switchMap(correo => {
        return this.clienteService.obtenerClientePorCorreo(correo);
      })
    ).subscribe(
      (cliente) => {
        if (cliente) {
          this.nombre = cliente.nombre;
          this.apellido = cliente.apellido;
          this.telefono = cliente.telefono;
          this.direccion = cliente.direccion;
          this.estado = cliente.estado;
        } else {
          this.toastr.error('Cliente no encontrado');
        }
      },
      (error) => {
        console.error('Error al buscar cliente: ', error);
        this.toastr.error('Error al buscar cliente');
      }
    );
  }

  onCorreoChange() {
    this.correoSubject.next(this.correoElectronico); // Emitir el nuevo valor del correo
  }

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

        //alert('Formulario para actualizar el cliente');
        //alert('Formulario para firma del cliente');

        //Actualizar cliente
        this.actualizarClienteService
          .actualizarCliente(actualizarCli)
          .subscribe(
            (response) => {
              console.log('Cliente actualizado:', response);
              this.toastr.success('Cliente actualizado con éxito');
              this.clienteActualizado = actualizarCli; // Guarda los datos del cliente actualizado
            },
            (error) => {
              this.toastr.error('Error al actualizar el cliente');
            }
          );
      },
      (error) => {
        this.toastr.error('Error al generar la firma de actualización: ' + JSON.stringify(error, null, 2));
      }
    );
  }

  cerrarModal() {
    this.clienteActualizado = null; // Limpiar los datos del cliente actualizado cuando se cierra el modal
  }
}
