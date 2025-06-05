import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MenuAppComponent } from './components/pantalla-principal/menuapp.component';
import { AuthGuard } from './auth-guard.service';

export const routes: Routes = [
  { path: '', component: LoginComponent }, // Asegura que el login es la primera pantalla
  { path: 'home', component: MenuAppComponent, canActivate: [AuthGuard] }, // Protegemos la página principal
  { path: '**', redirectTo: '' } // Redirige cualquier ruta desconocida al login
];

