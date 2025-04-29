import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../../shared/navigation/navigation.component';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    NavigationComponent,
    Toast,
    ButtonModule,
    AvatarModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  providers: [MessageService, AuthService, Router],
})
export class LayoutComponent {
  private messageService = inject(MessageService);
  private authService = inject(AuthService);
  private router = inject(Router);
  constructor() {}

  visible: boolean = false;

  showConfirm() {
    if (!this.visible) {
      this.messageService.add({
        key: 'confirm',
        sticky: true,
        severity: 'success',
        summary: 'Avisando a un compañero',
      });
      this.visible = true;
    }
  }

  onConfirm() {
    this.messageService.clear('confirm');
    this.visible = false;
  }

  onReject() {
    this.messageService.clear('confirm');
    this.visible = false;
  }
  logout() {
    this.authService.logout();
    window.location.reload();
  }
}
