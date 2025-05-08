import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListarClientesService, ListarClientesRequest, ClienteListResponse, EliminarClienteRequest } from '../../services/listar-cliente.service';
import { FirmaService, CrearFirmaListarClientes, FirmaEliminarRequest, ClienteFirma } from '../../services/firma.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-cliente',
  imports: [FormsModule, CommonModule],
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClientesComponent {
  // Filtros
  correoElectronico: string = '';
  fechaRegistroDesde: string | null = null;
  fechaRegistroHasta: string | null = null;
  pagina: number = 0;
  tamanoPagina: number = 10;
  
  // Datos
  clientes: any[] = [];
  totalPaginas: number = 0;
  totalElements: number = 0;
  loading: boolean = false;
  
  // Modal
  clienteSeleccionado: any = null;
  modalVisible: boolean = false;
  clienteAEliminar: any = null;
  modalEliminacion: boolean = false;

  constructor(
    private listarService: ListarClientesService,
    private firmaService: FirmaService,
    private toastr: ToastrService
  ) {}

  // Formatear fecha para el backend
  formatFecha(fecha: string | null): string | null {
    if (!fecha) return null;
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  // Cargar clientes con filtros
  onFilter() {
    this.loading = true;
    
    const formattedDesde = this.formatFecha(this.fechaRegistroDesde);
    const formattedHasta = this.formatFecha(this.fechaRegistroHasta);
  
    if (!this.correoElectronico || !formattedDesde || !formattedHasta) {
      this.loading = false;
      this.toastr.error('Por favor, asegúrate de que todos los campos estén completos.');
      return; // Detenemos la ejecución si faltan parámetros
    }
  
    const firmaRequest: CrearFirmaListarClientes = {
      correoElectronico: this.correoElectronico,
      fechaRegistroDesde: formattedDesde,
      fechaRegistroHasta: formattedHasta,
      pagina: this.pagina,
      tamanoPagina: this.tamanoPagina
    };
  
    // Generar firma primero
    this.firmaService.generarFirmaListarCliente(firmaRequest).subscribe({
      next: (response) => {
        console.log('Firma generada:', response.firma);
        const request: ListarClientesRequest = {
          ...firmaRequest,
          firma: response.firma
        };
  
        console.log("Datos para el cliente", request);
  
        // Llamar al servicio para listar clientes
        this.listarService.listarCliente(request).subscribe({
          next: (response: ClienteListResponse) => {
            this.loading = false;
            if (response.codigo === 0) {
              this.clientes = response.clientes;
              this.totalPaginas = response.totalPaginas;
              this.totalElements = response.totalElements;
            } else if (response.codigo === 1) {
              this.toastr.error(response.mensaje || 'Error desconocido');
            } else if (response.codigo === 500) {
              this.toastr.error('Ha ocurrido un error al listar los clientes');
            } else {
              this.toastr.error('Error desconocido');
            }
          },
          error: (error) => {
            this.loading = false;
            if (error?.status === 400) {
              if (error?.error?.mensaje) {
                this.toastr.error('Error: ' + error?.error?.mensaje);
              } else {
                this.toastr.error('Por favor, revisa los parámetros enviados');
              }
            } else {
              this.toastr.error('Error al cargar clientes');
            }
          }
        });
      },
      error: (error) => {
        this.loading = false;
        console.error('Error al generar firma:', error);
        this.toastr.error('Error al generar firma');
      }
    });
  }
  
  
  // Métodos para el modal
  abrirModal(cliente: any): void {
    this.clienteSeleccionado = cliente;
    this.modalVisible = true;
  }

  cerrarModal(): void {
    this.modalVisible = false;
  }

  // Métodos para eliminar
  confirmarEliminacion(cliente: any): void {
    this.clienteAEliminar = cliente;
  }

  eliminarCliente(): void {
    if (!this.clienteAEliminar) return;

    const firmaRequest: FirmaEliminarRequest = {
      nombre: this.clienteAEliminar.nombre,
      correoElectronico: this.clienteAEliminar.correoElectronico
    };

    this.firmaService.generarFirmaEliminarCliente(firmaRequest).subscribe({
      next: (response) => {
        const request: EliminarClienteRequest = {
          nombre: firmaRequest.nombre,
          correoElectronico: firmaRequest.correoElectronico,
          firma: response.firma
        };

        this.listarService.eliminarCliente(request).subscribe({
          next: (response) => {
            if (response.codigo === 0) {
              this.modalEliminacion = true; // Muestra el modal
              this.clienteAEliminar = null;
              this.onFilter(); // Recargar la lista
            } else if (response.codigo === 1) {
              // Mostrar error al eliminar cliente cuando el código es 1
              this.toastr.error(response.mensaje || 'Error al eliminar cliente');
            }
          },
          error: (error) => {
            console.error('Error al eliminar cliente:', error);
            this.toastr.error('Error al eliminar cliente');
          }
        });
      },
      error: (error) => {
        console.error('Error al generar firma:', error);
      }
    });
  }

  // Métodos para paginación
  siguientePagina(): void {
    if (this.pagina < this.totalPaginas - 1) {
      this.pagina++;
      this.onFilter();
    }
  }

  anteriorPagina(): void {
    if (this.pagina > 0) {
      this.pagina--;
      this.onFilter();
    }
  }
}
