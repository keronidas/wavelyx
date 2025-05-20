import { Component, computed, inject } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Router } from '@angular/router';
import { CarritoProducto } from '../../interfaces/producto-carrito.interface';
import { PublicarPedidoService } from '../../services/publicar-pedido.service';

@Component({
  selector: 'app-pasarela-pago',
  imports: [],
  templateUrl: './pasarela-pago.component.html',
})
export class PasarelaPagoComponent {
  private carritoService = inject(CarritoService);
  private router = inject(Router);
  private publicarPedidoService = inject(PublicarPedidoService);
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
      alert('Pedido enviado con éxito');
    } catch {
      alert('Hubo un error al enviar el pedido');
    }
  }
  removeItem(id: string) {
    this.carritoService.removeItem(id);
  }
}
