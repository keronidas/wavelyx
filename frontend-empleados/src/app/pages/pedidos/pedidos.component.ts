import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../services/pedidos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

type EstadoPedido = 'recepcionado' | 'preparando' | 'enviado';
type EstadosPermitidos = Record<EstadoPedido, EstadoPedido[]>;
type Pedido = {
  _id: string;
  estado: EstadoPedido;
  fecha_pedido: string;
  coste_total: number;
  numero_seguimiento: string;
  [key: string]: any;
};

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  filteredPedidos: Pedido[] = [];
  currentPage = 1;
  itemsPerPage = 5;

  // Estadísticas
  totalPedidos = 0;
  recepcionado = 0;
  preparando = 0;
  enviado = 0;

  // Filtros
  estadoFilter: EstadoPedido | '' = '';
  fechaDesde = '';
  fechaHasta = '';

  estadosPermitidos: EstadosPermitidos = {
    recepcionado: ['preparando'],
    preparando: ['enviado'],
    enviado: []
  };

  estadoTextos: Record<EstadoPedido, string> = {
    recepcionado: 'Recepcionado',
    preparando: 'Preparando',
    enviado: 'Enviado'
  };

  estadoColores: Record<EstadoPedido, string> = {
    recepcionado: 'bg-blue-100 text-blue-800',
    preparando: 'bg-yellow-100 text-yellow-800',
    enviado: 'bg-green-100 text-green-800'
  };

  constructor(private pedidosService: PedidosService) {}
  getMin(a: number, b: number): number {
    return Math.min(a, b);
  }
  ngOnInit(): void {
    this.loadPedidos();
  }

  loadPedidos(): void {
    this.pedidosService.getPedidos().subscribe({
      next: (data: Pedido[]) => {
        this.pedidos = data;
        this.filteredPedidos = [...data];
        this.updateStats();
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error al cargar pedidos:', error);
      }
    });
  }

  cambiarEstado(pedido: Pedido, nuevoEstado: EstadoPedido): void {
    if (!this.estadoValido(pedido.estado, nuevoEstado)) {
      console.warn(`Transición no permitida: ${pedido.estado} → ${nuevoEstado}`);
      return;
    }

    const estadoAnterior = pedido.estado;
    pedido.estado = nuevoEstado;

    this.pedidosService.actualizarEstadoPedido(pedido._id, nuevoEstado).subscribe({
      next: () => {
        this.updateStats();
        this.mostrarNotificacion(`Estado cambiado a ${this.estadoTextos[nuevoEstado]}`);
      },
      error: (err) => {
        console.error('Error al actualizar estado:', err);
        pedido.estado = estadoAnterior;
        this.mostrarError('No se pudo cambiar el estado');
      }
    });
  }

  estadoValido(estadoActual: string, nuevoEstado: EstadoPedido): boolean {
    return this.estadosPermitidos[estadoActual as EstadoPedido]?.includes(nuevoEstado) ?? false;
  }

  updateStats(): void {
    this.totalPedidos = this.pedidos.length;
    this.recepcionado = this.pedidos.filter(p => p.estado === 'recepcionado').length;
    this.preparando = this.pedidos.filter(p => p.estado === 'preparando').length;
    this.enviado = this.pedidos.filter(p => p.estado === 'enviado').length;
  }

  applyFilters(): void {
    let result = [...this.pedidos];

    if (this.estadoFilter) {
      result = result.filter(p => p.estado === this.estadoFilter);
    }

    if (this.fechaDesde) {
      const desdeDate = new Date(this.fechaDesde);
      result = result.filter(p => new Date(p.fecha_pedido) >= desdeDate);
    }

    if (this.fechaHasta) {
      const hastaDate = new Date(this.fechaHasta);
      result = result.filter(p => new Date(p.fecha_pedido) <= hastaDate);
    }

    this.filteredPedidos = result;
    this.currentPage = 1;
  }

  getStatusColor(status: EstadoPedido): string {
    return this.estadoColores[status] || 'bg-gray-100 text-gray-800';
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? '' : date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  // Métodos para paginación
  get paginatedPedidos(): Pedido[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredPedidos.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredPedidos.length / this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get pages(): number[] {
    return Array.from({length: this.totalPages}, (_, i) => i + 1);
  }

  private mostrarNotificacion(mensaje: string): void {
    // Implementar lógica de notificación (Toast, Snackbar, etc.)
    console.log(mensaje);
  }

  private mostrarError(mensaje: string): void {
    // Implementar lógica de error
    console.error(mensaje);
  }
}