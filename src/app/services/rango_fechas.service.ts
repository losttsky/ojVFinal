import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ReporteResponsabilidadService {
  private url = 'http://localhost:3000/api/reportes';

  constructor(private http: HttpClient) {}

  obtenerReportes(fechaInicio: string, fechaFin: string) {
    return this.http.post<any[]>(`${this.url}/responsables`, { fechaInicio, fechaFin });
  }

  buscarPorSerie(serie: string) {
  return this.http.post<any[]>(`${this.url}/por-serie`, { serie });
}


}
