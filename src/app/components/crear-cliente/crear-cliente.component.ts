import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente, CrearClienteService } from '../../services/crear-cliente.service';
import { ClienteFirma, FirmaService } from '../../services/firma.service';

@Component({
  selector: 'app-crear-cliente',
  imports: [FormsModule],
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

    //Generar firma del cliente
    this.firmaService.generarFirmaCrearCliente(nuevoClienteFirma).subscribe(
      (firmaGenerada) => {
        nuevoCliente.firma = firmaGenerada.firma;
        console.log("Datos para la firma: ",nuevoClienteFirma);
        console.log("Firma Generada: ", firmaGenerada);

        //Crear el cliente
        this.crearClienteService.crearCliente(nuevoCliente).subscribe(
          (response) => {
            console.log('Cliente creado:', response);
            console.log("Interfaz Cliente: ", nuevoCliente);
            alert('Cliente creado con exito');
          },
          (error) => {
            console.log("Interfaz Cliente: ", nuevoCliente);
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

