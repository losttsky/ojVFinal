import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LugarEntregaService {
  private apiUrl = 'http://localhost:3000/api/lugarEntrega';

  constructor(private http: HttpClient) {}

  buscar(id: string, descripcion: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, {
      params: { id, descripcion }
    });
  }
}
