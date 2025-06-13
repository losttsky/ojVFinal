import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service'; //

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private loginService: LoginService) {}

  login() {
    this.loginService
      .login(this.username.trim(), this.password.trim())
      .subscribe({
        next: (res) => {
          alert(`Bienvenido, ${res.DESCRIPCION_TECNICO}`);
          localStorage.setItem('username', res.NOMBRE_USUARIO);
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('rol', res.ROL); // almacenar el rol del usuario
          this.router.navigate(['/home']);
        },
        error: (err) => {
          alert('❌ Usuario o contraseña incorrectos');
        },
      });
    console.log('🔐 Username:', `"${this.username}"`);
    console.log('🔐 Password:', `"${this.password}"`);
  }
}
