import {
  Component,
  ElementRef,
  ViewChild,
  inject,
  computed,
} from '@angular/core';
import { CarritoDirective } from '../../directives/carrito.directive';
import { CommonModule } from '@angular/common';
import { CarritoProducto } from '../../interfaces/producto-carrito.interface';
import { CartIconComponent } from '../cart-icon/cart-icon.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CartIconComponent],
  templateUrl: './cart.component.html',
  providers: [CarritoDirective],
})
export class CartComponent {
  @ViewChild('cart') cartElement!: ElementRef;
  @ViewChild('cartIcon') cartIconElement!: ElementRef;
  private carritoDirective = inject(CarritoDirective);
  isVisible = false;

  carrito = this.carritoDirective.carrito;
  total = computed(() =>
    this.carrito().reduce((sum, item) => sum + item.precio * item.cantidad, 0)
  );

  toggleCartVisibility() {
    this.isVisible = !this.isVisible;
    this.cartElement.nativeElement.classList.toggle('hidden', !this.isVisible);
    this.cartIconElement.nativeElement.classList.toggle(
      'bg-green-600',
      this.isVisible
    );
  }

  updateQuantity(id: string, change: number) {
    this.carritoDirective.updateCarrito((items) => {
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
    this.carritoDirective.updateCarrito((items) => {
      const nuevosItems = items.filter((item) => item.id !== id);
      localStorage.removeItem(id); 
      return nuevosItems;
    });
  }
  
}
