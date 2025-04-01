import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EliminarCliente, ListarClientesService } from '../../services/listar-cliente.service';
import { ClienteFirma, FirmaService } from '../../services/firma.service';

@Component({
  selector: 'app-listar-cliente',
  imports: [FormsModule, CommonModule],
  templateUrl: './listar-cliente.component.html',
  styleUrl: './listar-cliente.component.css'
})


export class ListarClientesComponent {
  correoElectronico: string = '';
  fechaRegistroInicio: string | null = null;
  fechaRegistroFin: string | null = null;
  estatus: boolean = true;
  pagina: number = 0;
  tamanoPagina: number = 1;
  firma: string = '';
  clientes: any[] = [];
  totalPaginas: number = 0;
  totalElements: number = 0;
  clienteSeleccionado: any = null;
  modalVisible: boolean = false;
  clienteAEliminar: any = null;
  loading: boolean = true;

  constructor(
    private listarClienteService: ListarClientesService,
    private firmaService: FirmaService
  ) {}


  confirmarEliminacion(cliente: any) {
    this.clienteAEliminar = cliente;
  }

  // Método para formatear la fecha a "YYYY-MM-DD HH:mm:ss"
  formatFecha(fecha: string): string {
    if (!fecha) return '';
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  onFilter() {
    this.loading = true;
    // Formatear las fechas antes de enviarlas
    const formattedFechaRegistroInicio = this.fechaRegistroInicio
      ? this.formatFecha(this.fechaRegistroInicio)
      : null;
    const formattedFechaRegistroFin = this.fechaRegistroFin
      ? this.formatFecha(this.fechaRegistroFin)
      : null;

    const filtro = {
      correoElectronico: this.correoElectronico,
      fechaRegistroInicio: formattedFechaRegistroInicio,
      fechaRegistroFin: formattedFechaRegistroFin,
      estatus: this.estatus,
      pagina: this.pagina,
      tamanoPagina: this.tamanoPagina,
      firma: this.firma,
    };

    const FirmaListar = {
      correoElectronico: this.correoElectronico,
      fechaRegistroInicio: formattedFechaRegistroInicio,
      fechaRegistroFin: formattedFechaRegistroFin,
      estatus: this.estatus,
      pagina: this.pagina,
      tamanoPagina: this.tamanoPagina,
    };

    //Generar firma
    this.firmaService.generarFirmaListarCliente(FirmaListar).subscribe(
      (firmaGenerada) => {
        filtro.firma = firmaGenerada.firma;

        //Listar
        this.listarClienteService.listarCliente(filtro).subscribe(
          (response) => {
            this.loading = false;
            if (response.codigo === 0) {
              this.clientes = response.clientes;
            }

            if (response.codigo === 0) {
              this.clientes = response.clientes;
              this.totalPaginas = response.totalPaginas;
              this.totalElements = response.totalElements;
            }
            console.log('Paginado: ', response);
          },
          (error) => {
            this.loading = false;
            console.error('Error al paginar', error);
            alert('Error al paginar');
          }
        );
      },
      (error) => {
        console.error('No se pudo firmar: ', error), alert('No se pudo firmar');
      }
    );
    console.log('Filtro aplicado:', filtro);
    console.log('Firma: ', FirmaListar);
    // Aquí puedes enviar la solicitud a tu servicio para filtrar clientes
  }

  abrirModal(cliente: any) {
    this.clienteSeleccionado = cliente;
    this.modalVisible = true;
  }

  cerrarModal() {
    this.modalVisible = false;
  }

  eliminarCliente() {
    if (!this.clienteAEliminar) return;

    const eliminarCliente: EliminarCliente = {
      correo_electronico: this.clienteAEliminar.correoElectronico,
      firma: '',
    };

    const firmaElimar: ClienteFirma = {
      correoActual: this.clienteAEliminar.correoElectronico,
      nombre: '',
      apellido: '',
      nuevoCorreo: '',
      direccion: '',
      telefono: '',
      estado: null,
    };

    this.firmaService.generarFirmaCrearCliente(firmaElimar).subscribe(
      (firmaGenerada) => {
        eliminarCliente.firma = firmaGenerada.firma;
        console.log('Firma generada de eliminar: ', firmaGenerada);
        console.log('Datos para la firma: ', firmaElimar);

        this.listarClienteService.eliminarCliente(eliminarCliente).subscribe(
          (response) => {
            alert(
              `Cliente ${this.clienteAEliminar.nombre} eliminado correctamente.`
            );

            // Restablecer cliente a eliminar
            this.clienteAEliminar = null;

            // Recargar la lista de clientes con los mismos filtros actuales
            this.onFilter();
            // Actualizar la lista de clientes
            this.clientes = this.clientes.filter(
              (c) =>
                c.correoElectronico !== this.clienteAEliminar.correo_electronico
            );
            this.clienteAEliminar = null;
          },
          (error) => {
            console.error('Error al eliminar cliente', error);
            alert('Error al eliminar cliente');
          }
        );
      },
      (error) => {
        console.error('Ocurrio un error al eliminar', error);
        alert('Ocurrio un error al eliminar');
      }
    );
  }
}
