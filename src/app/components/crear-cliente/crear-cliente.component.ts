import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente, CrearClienteService } from '../../services/crear-cliente.service';
import { ClienteFirma, FirmaService } from '../../services/firma.service';
import { CommonModule } from '@angular/common';

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

  clienteCreado: Cliente | null = null; // Guarda el cliente creado
  modalVisible: boolean = false;    

  constructor(
    private crearClienteService: CrearClienteService,
    private firmaService: FirmaService

  ) {}

  onSubmit() {
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
            this.clienteCreado = response; // Guarda el cliente para mostrar
            this.modalVisible = true; // Muestra el modal
            
            // Limpia el formulario
            this.nombre = '';
            this.apellido = '';
            this.correoElectronico = '';
            this.direccion = '';
            this.telefono = '';
          },
          (error) => {
            console.error('Error al crear el cliente:', error);
            alert('Error al crear cliente');
          }
        );
      },
      (error) => {
        console.error('Error al generar la firma:', error);
        alert('Error al generar firma');
      }
    );
  }  
}

