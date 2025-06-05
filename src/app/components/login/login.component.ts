import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  login() {
    if (this.username === 'admin' && this.password === 'password') {
      localStorage.setItem('username', this.username); // Guarda el nombre de usuario
      localStorage.setItem('loggedIn', 'true'); // Guarda la sesión
      this.router.navigate(['/home']); // Redirige a la página principal
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos';
    }
  }
}
