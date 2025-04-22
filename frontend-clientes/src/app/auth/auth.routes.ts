import { Routes } from "@angular/router";
import { LoginUserComponent } from "../pages/login-user/login-user.component";
import { RegisterUserComponent } from "../pages/register-user/register-user.component";


export const authRoutes: Routes = [
    {
        path: 'login',
        component: LoginUserComponent
    },
    {
        path: 'register',
        component: RegisterUserComponent
    },
    { path: '**', redirectTo: 'login' }
]

export default authRoutes;