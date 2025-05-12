import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { CarritoService } from '../services/carrito.service';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PagoGuard implements CanActivate {
  private carritoService = inject(CarritoService);
  private router = inject(Router);
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.carritoService.carrito().length > 0) {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
}
