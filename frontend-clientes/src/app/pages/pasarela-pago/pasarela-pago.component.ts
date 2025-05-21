import { Component, computed, inject } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Router } from '@angular/router';
import { CarritoProducto } from '../../interfaces/producto-carrito.interface';
import { PublicarPedidoService } from '../../services/publicar-pedido.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
@Component({
  selector: 'app-pasarela-pago',
  imports: [Toast],
  templateUrl: './pasarela-pago.component.html',
  providers: [MessageService]
})
export class PasarelaPagoComponent {
  private carritoService = inject(CarritoService);
  private router = inject(Router);
  private publicarPedidoService = inject(PublicarPedidoService);
  private messageService = inject(MessageService)
  carrito = this.carritoService.carrito;
  total = computed(
    () =>
      Math.round(
        this.carrito().reduce(
          (sum, item) => sum + item.precio * item.cantidad,
          0
        ) * 100
      ) / 100
  );
  constructor() {
    console.log(this.carrito());
  }
  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Tramite realizado',
      detail: 'Tramite realizado con exito',
    });
  }
  goBack() {
    this.router.navigate(['/home']);
  }
  updateQuantity(id: string, change: number) {
    this.carritoService.updateCarrito((items) => {
      return items
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.cantidad + change;
            return newQuantity > 0 ? { ...item, cantidad: newQuantity } : null;
          }
          return item;
        })
        .filter(Boolean) as CarritoProducto[];
    });
  }
  async enviarPedido() {
    try {
      await this.publicarPedidoService.publicarPedido();
      this.showSuccess()
    } catch {
      alert('Hubo un error al enviar el pedido');
    }
  }
  removeItem(id: string) {
    this.carritoService.removeItem(id);
  }
}
