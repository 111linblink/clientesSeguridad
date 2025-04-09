import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente, CrearClienteService } from '../../services/crear-cliente.service';
import { ClienteFirma, FirmaService } from '../../services/firma.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-cliente',
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-cliente.component.html',
  styleUrl: './crear-cliente.component.css'
})
export class CrearClienteComponent {
  nombre = '';
  apellido = '';
  correoElectronico = '';
  direccion = '';
  telefono = '';
  firma = '';

  clienteCreado: Cliente | null = null;
  modalVisible: boolean = false;
  modalErrorVisible: boolean = false;

  constructor(
    private crearClienteService: CrearClienteService,
    private firmaService: FirmaService,
     private toastr: ToastrService
  ) {}

  onSubmit(formulario: any) {
    // Verificar si el formulario es válido
    if (formulario.invalid) {
      this.modalErrorVisible = true;  // Mostrar el modal de error si el formulario no es válido
      this.showErrorMessages(formulario);  // Mostrar mensajes de error
      return;
    }

    const nuevoCliente: Cliente = {
      nombre: this.nombre,
      apellido: this.apellido,
      correoElectronico: this.correoElectronico,
      telefono: this.telefono,
      direccion: this.direccion,
      firma: this.firma,
    };

    const nuevoClienteFirma: ClienteFirma = {
      nombre: this.nombre,
      newName: '',
      apellido: this.apellido,
      correoElectronico: this.correoElectronico,
      nuevoCorreoElectronico: '',
      telefono: this.telefono,
      direccion: this.direccion,
      estado: null,
    };

    this.firmaService.generarFirmaCrearCliente(nuevoClienteFirma).subscribe(
      (firmaGenerada) => {
        nuevoCliente.firma = firmaGenerada.firma;

        this.crearClienteService.crearCliente(nuevoCliente).subscribe(
          (response) => {
            this.clienteCreado = response;
            this.modalVisible = true;

            // Limpiar el formulario
            this.nombre = '';
            this.apellido = '';
            this.correoElectronico = '';
            this.direccion = '';
            this.telefono = '';
          },
          (error) => {
            console.error('Error al crear el cliente:', error);
            this.toastr.error('Error al crear el cliente por.', error);
          }
        );
      },
      (error) => {
        console.error('Error al generar la firma:', error);
        this.toastr.error('Error al generar firma');
      }
    );
  }

  showErrorMessages(formulario: any) {
    if (formulario.controls.nombre?.invalid) {
      this.toastr.error('El nombre es obligatorio');
    } 
    if (formulario.controls.apellido?.invalid) {
      this.toastr.error('El apellido es obligatorio');
    }
    if (formulario.controls.correoElectronico?.invalid) {
      if (formulario.controls.correoElectronico?.errors?.['required']) {
        this.toastr.error('El correo es obligatorio');
      } else if (formulario.controls.correoElectronico?.errors?.['email']) {
        this.toastr.error('El correo no tiene un formato válido');
      }
    }
    if (formulario.controls.direccion?.invalid) {
      this.toastr.error('La dirección es obligatoria');
    }
    if (formulario.controls.telefono?.invalid) {
      if (formulario.controls.telefono?.errors?.['required']) {
        this.toastr.error('El teléfono es obligatorio');
      } else if (formulario.controls.telefono?.errors?.['pattern']) {
        this.toastr.error('El teléfono debe tener 10 digitos');
      }
    }
  }
}
