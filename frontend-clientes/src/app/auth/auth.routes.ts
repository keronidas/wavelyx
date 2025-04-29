import { Routes } from '@angular/router';
import { LoginUserComponent } from '../pages/login-user/login-user.component';
import { RegisterUserComponent } from '../pages/register-user/register-user.component';
import { NoAuthGuard } from '../guards/login.guard';

export const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginUserComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'register',
    component: RegisterUserComponent,
    canActivate: [NoAuthGuard],
  },
  { path: '**', redirectTo: 'login' },
];

export default authRoutes;
