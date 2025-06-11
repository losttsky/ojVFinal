import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DependenciasService {
  private apiUrl = 'http://localhost:3000/api/dependencias';

  constructor(private http: HttpClient) {}

  getDepartamentos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/departamentos`);
  }

  getMunicipios(departamento: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/municipios/${departamento}`);
  }

  guardarDependencia(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/guardar`, data);
  }

  buscarDependencias(
    departamento: number | null,
    municipio: number | null
  ): Observable<any[]> {
    let params: any = {};
    if (departamento !== null) params.departamento = departamento;
    if (municipio !== null) params.municipio = municipio;

    return this.http.get<any[]>(`${this.apiUrl}/buscar`, { params });
  }
}
