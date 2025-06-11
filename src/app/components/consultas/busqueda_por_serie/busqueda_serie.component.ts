import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReporteResponsabilidadService } from '../../../services/rango_fechas.service';

@Component({
  selector: 'app-busqueda-serie',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './busqueda_serie.component.html',
  styleUrls: ['./busqueda_serie.component.css'],
})
export class BusquedaPorSerieComponent {
  serie: string = '';
  resultados: any[] = [];
  busquedaRealizada = false;

  constructor(private reporteService: ReporteResponsabilidadService) {}

  buscarSerie() {
    this.busquedaRealizada = true;

    this.reporteService.buscarPorSerie(this.serie.trim()).subscribe({
      next: (data) => {
        this.resultados = data;
        if (data.length > 0) {
          const html = this.generarHTML(data);
          const ventana = window.open('', '_blank', 'width=1000,height=700');
          if (ventana) {
            ventana.document.open();
            ventana.document.write(html);
            ventana.document.close();
          }
        }
      },
      error: () => {
        alert('❌ Error al buscar por serie');
        this.resultados = [];
      }
    });
  }

  limpiar() {
    this.serie = '';
    this.resultados = [];
    this.busquedaRealizada = false;
  }

  generarHTML(data: any[]): string {
    const r = data[0]; // solo habrá uno

    return `
    <html>
      <head>
        <title>Reporte por Serie</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          th, td { border: 1px solid #000; padding: 8px; font-size: 0.9rem; }
        </style>
      </head>
      <body>
        <h2>Nota de Responsabilidad</h2>
        <p><strong>Ref:</strong> T-${r.referencia}</p>
        <table>
          <tr><th>Fecha:</th><td>${r.fecha}</td></tr>
          <tr><th>Dependencia:</th><td>${r.dependencia}</td></tr>
          <tr><th>Ubicación:</th><td>${r.departamento}, ${r.municipio}</td></tr>
          <tr><th>Técnico:</th><td>${r.tecnico}</td></tr>
        </table>

        <h4>INFORMACIÓN DEL EQUIPO</h4>
        <table>
          <thead>
            <tr>
              <th>Inventario</th>
              <th>Cant</th>
              <th>Dispositivo</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Serie</th>
            </tr>
          </thead>
          <tbody>
            ${r.articulos.map((art: any) => `
              <tr>
                <td>${art.inventario}</td>
                <td>${art.cantidad}</td>
                <td>${art.dispositivo}</td>
                <td>${art.marca}</td>
                <td>${art.modelo}</td>
                <td>${art.serie}</td>
              </tr>`).join('')}
          </tbody>
        </table>
        <p><strong>Persona que entrega:</strong> ${r.persona_entrega}</p>
      </body>
      <hr>
    </html>`;
  }
}
