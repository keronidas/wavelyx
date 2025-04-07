import { Component, inject } from '@angular/core';
import { RoutingDirective } from '../../directives/routing.directive';
import { NgxTypedJsModule } from 'ngx-typed-js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgxTypedJsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [RoutingDirective]
})
export class HomeComponent {
  private navegation = inject(RoutingDirective)
  public rutasPagina = this.navegation.rutasPagina
}
