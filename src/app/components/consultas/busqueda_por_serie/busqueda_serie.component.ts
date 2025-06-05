import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Item {
  grupo: string;
  subgrupo: string;
  articulo: string;
  cantidad: number;
  descripcion: string;
  serie: string;
}

@Component({
  selector: 'app-busqueda-serie',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './busqueda_serie.component.html',
  styleUrls: ['./busqueda_serie.component.css'],
})
export class BusquedaPorSerieComponent {
  // Campo de entrada de serie
  serie: string = '';

  // Resultados de la búsqueda
  resultados: Item[] = [];

  // Indicador para mostrar mensaje "no encontrado"
  busquedaRealizada = false;

  /** 
   * Simula la búsqueda por serie y rellena `this.resultados`.
   * Reemplaza aquí con tu llamada HTTP real.
   */
  buscarSerie() {
    this.busquedaRealizada = true;
    console.log('Buscando items con serie:', this.serie);

    // Simulación de resultados de ejemplo
    this.resultados = this.serie
      ? [
          {
            grupo: 'DISPOSITIVOS',
            subgrupo: 'TECLADO',
            articulo: '33976',
            cantidad: 1,
            descripcion: 'TECLADO USB',
            serie: this.serie.trim(),
          },
        ]
      : [];
  }

  /** Limpia el campo de serie y los resultados */
  limpiar() {
    this.serie = '';
    this.resultados = [];
    this.busquedaRealizada = false;
  }
}
