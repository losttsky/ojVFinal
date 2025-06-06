import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReporteResponsabilidadService } from '../../../services/rango_fechas.service';

@Component({
  selector: 'app-reportes-rango',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rango_fechas.component.html',
  styleUrls: ['./rango_fechas.component.css'],
  providers: [ReporteResponsabilidadService]
})
export class RangoFechasComponent {
  fechaInicio: string = '';
  fechaFin: string = '';
  reportes: any[] = [];
  busquedaRealizada = false;

  mostrarModal = false;
  reporteActualIndex = 0;

  constructor(private reporteService: ReporteResponsabilidadService) {}

buscarReportes() {
  this.busquedaRealizada = true;
  this.reporteService.obtenerReportes(this.fechaInicio, this.fechaFin).subscribe({
    next: (data) => {
      if (data.length === 0) {
        alert('No se encontraron reportes en el rango de fechas');
        return;
      }

      // Construir HTML dinámico
      const html = this.generarHTML(data);
      const ventana = window.open('', '_blank', 'width=1000,height=700');
      if (ventana) {
        ventana.document.open();
        ventana.document.write(html);
        ventana.document.close();
      }
    },
    error: () => {
      alert('❌ Error al obtener reportes');
    }
  });
}

generarHTML(reportes: any[]): string {
  let html = `
  <html>
    <head>
      <title>Reportes de Responsabilidad</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        th, td { border: 1px solid #000; padding: 8px; font-size: 0.9rem; }
        h2, h3 { margin-top: 30px; }
        .page-break { page-break-after: always; }
      </style>
    </head>
    <body>
      <h2>Organismo Judicial - Reportes de Responsabilidad</h2>`;

  reportes.forEach((r, index) => {
    html += `
    <div class="reporte">
      <h3>Nota de Responsabilidad</h3>
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
        <tbody>`;

    r.articulos.forEach((art: any) => {
      html += `
          <tr>
            <td>${art.inventario}</td>
            <td>${art.cantidad}</td>
            <td>${art.dispositivo}</td>
            <td>${art.marca}</td>
            <td>${art.modelo}</td>
            <td>${art.serie}</td>
          </tr>`;
    });

    html += `
        </tbody>
      </table>
      <p><strong>Persona que entrega:</strong> ${r.persona_entrega}</p>
    </div>`;

    if (index < reportes.length - 1) {
      html += `<div class="page-break"></div>`;
    }
  });

  html += `
    </body>
  </html>`;
  return html;
}

  cerrarModal() {
    this.mostrarModal = false;
  }

  limpiar() {
    this.fechaInicio = '';
    this.fechaFin = '';
    this.reportes = [];
    this.mostrarModal = false;
    this.busquedaRealizada = false;
  }

  anterior() {
    if (this.reporteActualIndex > 0) {
      this.reporteActualIndex--;
    }
  }

  siguiente() {
    if (this.reporteActualIndex < this.reportes.length - 1) {
      this.reporteActualIndex++;
    }
  }

  get reporteActual() {
    return this.reportes[this.reporteActualIndex];
  }
}
