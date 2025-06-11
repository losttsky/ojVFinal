import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovimientosESService {
  private url = 'http://localhost:3000/api/movimientosEs/guardar';

  constructor(private http: HttpClient) {}

  guardarMovimiento(data: any) {
    return this.http.post(this.url, data);
  }
}
