import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DescargoListadoService {
  private baseUrl = 'http://localhost:3000/api/descargo';

  constructor(private http: HttpClient) {}

  obtenerArticulos(anio: number, numero: number) {
    return this.http.post<any[]>(`${this.baseUrl}/buscar`, {
      anioMovimiento: anio,
      numMovimiento: numero,
    });
  }

  actualizarArticulos(anio: number, numero: number, articulos: any[]) {
    return this.http.post(`${this.baseUrl}/actualizar`, {
      anioMovimiento: anio,
      numMovimiento: numero,
      articulos,
    });
  }

  obtenerUltimoMovimiento() {
    return this.http.get<any>(`${this.baseUrl}/ultimo-movimiento`);
  }
}
