import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('loggedIn') === 'true') {
      return true; // Permite el acceso a /home
    } else {
      this.router.navigate(['/']); // Redirige al login si no ha iniciado sesión
      return false;
    }
  }
}
