import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { PedidosService } from '../../services/pedidos.service';
import { CommonModule } from '@angular/common';
import { EmpleadoService } from '../../services/empleado.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ChartModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // Datos para gráficos
  data: any;
  options: any;

  // Estadísticas
  totalEmpleados: number = 0;
  pedidosRecepcionados: number = 0;
  pedidosPreparando: number = 0;
  pedidosEnviados: number = 0;
  totalPedidos: number = 0;
  ingresosTotales: number = 0;


  actividadesRecientes: any[] = [];


  isLoading: boolean = true;

  platformId = inject(PLATFORM_ID);

  constructor(
    private cd: ChangeDetectorRef,
    private pedidosService: PedidosService,
    private empleadosService: EmpleadoService
  ) { }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.isLoading = true;

    forkJoin({
      empleados: this.empleadosService.getEmpleados(),
      pedidos: this.pedidosService.getPedidos()
    }).subscribe({
      next: ({ empleados, pedidos }) => {

        this.totalEmpleados = empleados.length;


        this.totalPedidos = pedidos.length;
        this.pedidosRecepcionados = pedidos.filter(p => p.estado === 'recepcionado').length;
        this.pedidosPreparando = pedidos.filter(p => p.estado === 'preparando').length;
        this.pedidosEnviados = pedidos.filter(p => p.estado === 'enviado').length;
        this.ingresosTotales = pedidos.reduce((sum, pedido) => sum + (pedido.coste_total || 0), 0);


        this.generarActividadesRecientes(pedidos);


        this.initChart();

        this.isLoading = false;
        this.cd.markForCheck();
      },
      error: (error) => {
        console.error('Error cargando datos:', error);
        this.isLoading = false;
        this.cd.markForCheck();
      }
    });
  }

  generarActividadesRecientes(pedidos: any[]) {
    const pedidosRecientes = [...pedidos]
      .sort((a, b) => new Date(b.fecha_pedido).getTime() - new Date(a.fecha_pedido).getTime())
      .slice(0, 4);

    this.actividadesRecientes = pedidosRecientes.map(pedido => ({
      tipo: this.getTipoActividad(pedido.estado),
      estado: pedido.estado,
      fecha: pedido.fecha_pedido,
      pedidoId: pedido.pedido_id,
      total: pedido.coste_total
    }));
  }

  getTipoActividad(estado: string): { icono: string, color: string, texto: string } {
    switch (estado) {
      case 'recepcionado':
        return {
          icono: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
          color: 'blue',
          texto: 'Pedido recepcionado'
        };
      case 'preparando':
        return {
          icono: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
          color: 'yellow',
          texto: 'Pedido en preparación'
        };
      case 'enviado':
        return {
          icono: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
          color: 'green',
          texto: 'Pedido enviado'
        };
      default:
        return {
          icono: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
          color: 'gray',
          texto: 'Actualización de pedido'
        };
    }
  }

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');

      this.data = {
        labels: ['Recepcionados', 'Preparando', 'Enviados'],
        datasets: [{
          data: [this.pedidosRecepcionados, this.pedidosPreparando, this.pedidosEnviados],
          backgroundColor: [
            documentStyle.getPropertyValue('--p-red-500'),
            documentStyle.getPropertyValue('--p-yellow-500'),
            documentStyle.getPropertyValue('--p-green-500')
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--p-red-400'),
            documentStyle.getPropertyValue('--p-yellow-400'),
            documentStyle.getPropertyValue('--p-green-400')
          ]
        }]
      };

      this.options = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor
            }
          }
        }
      };
      this.cd.markForCheck();
    }
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? '' : date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}