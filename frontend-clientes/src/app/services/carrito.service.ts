import { computed, effect, Injectable, signal } from '@angular/core';
import { CarritoProducto } from '../interfaces/producto-carrito.interface';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private _carrito = signal<CarritoProducto[]>(this.loadInitialCart());

  carrito = this._carrito.asReadonly();

  constructor() {
    effect(() => {
      localStorage.setItem('carrito', JSON.stringify(this._carrito()));
    });
  }

  private loadInitialCart(): CarritoProducto[] {
    const saved = localStorage.getItem('carrito');
    return saved ? JSON.parse(saved) : [];
  }

  addToCarrito(producto: CarritoProducto) {
    this._carrito.update((items) => {
      const existing = items.find((item) => item.id === producto.id);
      return existing
        ? items.map((item) =>
            item.id === producto.id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          )
        : [...items, { ...producto, cantidad: 1 }];
    });
  }

  updateCarrito(updateFn: (items: CarritoProducto[]) => CarritoProducto[]) {
    this._carrito.update(updateFn);
  }
  removeItem(id: string) {
    this._carrito.update((items) => items.filter((item) => item.id !== id));
  }
}
