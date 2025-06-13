import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './crearUsuario.component.html',
  styleUrls: ['./crearUsuario.component.css']
})
export class CrearUsuarioComponent {
  nombreUsuario: string = '';
  password: string = '';
  rol: string = '';

  rolesDisponibles = ['Operador', 'Administrador', 'SuperUsuario'];

  constructor(private http: HttpClient) {}

  crearUsuario() {
    if (!this.nombreUsuario || !this.password || !this.rol) {
      alert('⚠️ Todos los campos son obligatorios.');
      return;
    }

    const nuevoUsuario = {
      nombre_usuario: this.nombreUsuario.trim(),
      password: this.password.trim(),
      rol: this.rol
    };

    this.http.post('http://localhost:3000/api/usuarios', nuevoUsuario).subscribe({
      next: () => {
        alert('✅ Usuario creado exitosamente.');
        this.nombreUsuario = '';
        this.password = '';
        this.rol = '';
      },
      error: (err) => {
        console.error(err);
        alert('❌ Error al crear el usuario.');
      }
    });
  }
}
