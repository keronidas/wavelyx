import { Component, inject } from '@angular/core';
import { RoutingDirective } from '../../directives/routing.directive';
import { MobileHomeComponent } from '../../components/mobile-home/mobile-home.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MobileHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [RoutingDirective]
})
export class HomeComponent {
private navegation = inject(RoutingDirective)
public rutasPagina= this.navegation.rutasPagina
}
