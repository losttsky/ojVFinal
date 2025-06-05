import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Reporte {
  fecha: string;
  descripcion: string;
  monto: number;
}

@Component({
  selector: 'app-reportes-rango',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rango_fechas.component.html',
  styleUrls: ['./rango_fechas.component.css'],
})
export class RangoFechasComponent {
  // Campos del formulario
  fechaInicio: string = '';
  fechaFin:    string = '';

  // Array de resultados
  reportes: Reporte[] = [];

  // Indicador para mostrar mensaje "no hay datos"
  busquedaRealizada = false;

  /** 
   * Llama a la lógica de búsqueda (aquí simulada) 
   * y llena `this.reportes` con los datos obtenidos.
   */
  buscarReportes() {
    this.busquedaRealizada = true;
    console.log('Buscando reportes entre:', this.fechaInicio, 'y', this.fechaFin);
    
    // ---- AQUI IRÍA TU llamada HTTP real ----
    // Por ahora simulamos datos de ejemplo:
    this.reportes = [
      {
        fecha: this.fechaInicio,
        descripcion: 'Reporte de prueba A',
        monto: 100.5
      },
      {
        fecha: this.fechaFin,
        descripcion: 'Reporte de prueba B',
        monto: 250.0
      }
    ];
  }

  /** Vacia los campos de fecha y de resultados */
  limpiar() {
    this.fechaInicio = '';
    this.fechaFin    = '';
    this.reportes    = [];
    this.busquedaRealizada = false;
  }

  /** Limpia un campo dado (aquí lo uso para resetear resultados) */
  limpiarCampo(campo: keyof RangoFechasComponent) {
    if (campo in this) {
      (this as any)[campo] = '';
      if (campo === 'reportes') {
        this.reportes = [];
      }
    }
  }
}
