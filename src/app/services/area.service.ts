import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AreaService {
  private apiUrl = 'http://localhost:3000/api/area'; // URL del backend (ajústalo si es necesario)

  constructor(private http: HttpClient) {}

  buscar(id: string, descripcion: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, {
      params: { id, descripcion }
    });
  }
}
