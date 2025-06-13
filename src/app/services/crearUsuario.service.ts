import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) {}

  crearUsuario(usuario: {
    nombre_usuario: string;
    password: string;
    rol: string;
    id_tecnico: number | null;
  }) {
    return this.http.post(this.apiUrl, usuario);
  }
}
