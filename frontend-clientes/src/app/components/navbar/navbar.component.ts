import { Component, computed, inject } from '@angular/core';
import { RoutingDirective } from '../../directives/routing.directive';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'shared-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  providers: [RoutingDirective],
})
export class NavbarComponent {
  private navegation = inject(RoutingDirective);
  private carritoService = inject(CarritoService);
  public rutasPagina = this.navegation.rutasPagina;
  public rutasIcono = this.navegation.rutasIconos;
  private authService = inject(AuthService);
  isLoged = computed(() => this.authService.isAuthenticated());
  menuOpen = false;
  carrito = this.carritoService.carrito;
  carritoOpen = this.carritoService.carritoAbierto;
  toggleMenu() {
    this.carritoService.closeCarrito();
    this.menuOpen = !this.menuOpen;
  }
  toggleCarrito() {
    this.menuOpen = false;
    this.carritoService.toggleCarrito();
  }
}
