import {
  Component,
  ElementRef,
  ViewChild,
  inject,
  computed,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { CarritoProducto } from '../../interfaces/producto-carrito.interface';
import { CarritoService } from '../../services/carrito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  @ViewChild('cart') cartElement!: ElementRef;
  @ViewChild('cartIcon') cartIconElement!: ElementRef;

  private carritoService = inject(CarritoService);
  private router = inject(Router);
  isVisible = false;
  carrito = this.carritoService.carrito;
  carritoAbierto = this.carritoService.carritoAbierto;
  total = computed(
    () =>
      Math.round(
        this.carrito().reduce(
          (sum, item) => sum + item.precio * item.cantidad,
          0
        ) * 100
      ) / 100
  );
  goToPago() {
    this.router.navigate(['/pago']);
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

  removeItem(id: string) {
    this.carritoService.removeItem(id);
  }
}
