import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';

@Component({
  selector: 'app-navigation',
  imports: [Menubar],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink:'home'
      },
      {
        label: 'Pedidos',
        icon: 'pi pi-box',
        routerLink:'pedidos'
      },
      {
        label: 'Empleados',
        icon: 'pi pi-user',
        routerLink: 'empleados'
      },
    ];
  }
}
