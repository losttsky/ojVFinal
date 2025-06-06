import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DescargoListadoService {
  private baseUrl = 'http://localhost:3000/descargo';

  constructor(private http: HttpClient) {}

  // Consulta por año y número de movimiento
  obtenerArticulos(anio: number, numero: number) {
    return this.http.post<any[]>(`${this.baseUrl}/buscar`, { anioMovimiento: anio, numMovimiento: numero });
  }

  // Envía los artículos actualizados para desligar
  actualizarArticulos(anio: number, numero: number, articulos: any[]) {
    return this.http.post(`${this.baseUrl}/actualizar`, { anioMovimiento: anio, numMovimiento: numero, articulos });
  }
}
