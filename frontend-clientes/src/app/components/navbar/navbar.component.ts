import { Component, computed, inject } from '@angular/core';
import { RoutingDirective } from '../../directives/routing.directive';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
  public rutasPagina = this.navegation.rutasPagina;
  public rutasIcono = this.navegation.rutasIconos;
  private authService = inject(AuthService);
  isLoged = computed(() => this.authService.isAuthenticated());
}
