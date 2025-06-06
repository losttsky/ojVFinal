import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TecnicosService {
  private apiUrl = 'http://localhost:3000/tecnicos';

  constructor(private http: HttpClient) {}

  buscar(id: string, descripcion: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?id=${id}&descripcion=${descripcion}`);
  }
}
