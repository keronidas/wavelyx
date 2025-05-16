import { Component, HostListener, inject } from '@angular/core';
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
  isLargeScreen = false;

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isLargeScreen = window.innerWidth >= 1023; 
  }
}
