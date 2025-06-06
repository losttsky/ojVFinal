import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ArticulosService {
  private apiUrl = 'http://localhost:3000/api/articulos';

  constructor(private http: HttpClient) {}

  getGrupos() {
    return this.http.get(`${this.apiUrl}/grupos`);
  }

  getSubgrupos() {
    return this.http.get(`${this.apiUrl}/subgrupos`);
  }

  getMedidas() {
    return this.http.get(`${this.apiUrl}/medidas`);
  }

  getMarcas() {
    return this.http.get(`${this.apiUrl}/marcas`);
  }

  getModelos() {
    return this.http.get(`${this.apiUrl}/modelos`);
  }

  getEstados(){
    return this.http.get(`${this.apiUrl}/estados-dispositivo`)
  }

  getTecnicos() {
    return this.http.get(`${this.apiUrl}/tecnicos`);
  }

  getNits() {
    return this.http.get(`${this.apiUrl}/nits`);
  }

  ingresarArticulo(data: any) {
    return this.http.post(`${this.apiUrl}/ingresar`, data);
  }
}
