import { Component, inject } from '@angular/core';
import { CartIconComponent } from '../../components/cart-icon/cart-icon.component';
import { ProductsService } from '../../services/products.service';
import { CarritoProducto } from '../../interfaces/producto-carrito.interface';
import { Producto } from '../../interfaces/producto.interface';
import { CarritoService } from '../../services/carrito.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-bio-products',
  imports: [CartIconComponent, Toast],
  templateUrl: './bio-products.component.html',
  providers: [ProductsService, MessageService],
})
export class BioProductsComponent {
  private carritoService = inject(CarritoService);
  productos: Producto[] = [];
  private productoService = inject(ProductsService);
  host = 'localhost:3000';
  constructor(private messageService: MessageService) {}
  ngOnInit(): void {
    this.productoService.getProductos().subscribe((data) => {
      this.productos = data;
      const baseUrl = `${window.location.protocol}//${this.host}`;
      this.productos.forEach((element) => {
        element.imagen = `${baseUrl}${element.imagen}`;
      });
    });
  }
  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Agregado con carrito',
      detail: 'Producto agregado con exito al carrito',
    });
  }
  addToCarrito(product: Producto): void {
    const nuevoProducto: CarritoProducto = {
      id: product.id_producto,
      nombre: product.nombre,
      precio: product.precio,
      imagen: product.imagen,
      cantidad: 1,
    };
    this.carritoService.addToCarrito(nuevoProducto);
    this.showSuccess();
  }
}
