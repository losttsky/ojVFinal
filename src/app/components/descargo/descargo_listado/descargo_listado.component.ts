import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DescargoListadoService } from '../../../services/descargo_listado.service';

@Component({
  selector: 'app-descargo-listado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './descargo_listado.component.html',
  styleUrls: ['./descargo_listado.component.css'],
})
export class DescargoListadoComponent {
  anioMovimiento: number = 2025;
  numMovimiento: number = 190;
  datosTabla: any[] = [];

  constructor(private descargoService: DescargoListadoService) {}

  actualizarConsulta() {
    // Enviar los datos para actualizar solo si hay datos cargados
    if (this.datosTabla.length > 0) {
      const marcados = this.datosTabla.filter(item => item.actualizado);
      if (marcados.length > 0) {
        this.descargoService.actualizarArticulos(this.anioMovimiento, this.numMovimiento, this.datosTabla).subscribe({
          next: () => {
            alert('✅ Artículos actualizados (desligados) correctamente');
            this.obtenerArticulos(); // vuelve a cargar
          },
          error: () => alert('❌ Error al actualizar artículos'),
        });
      } else {
        this.obtenerArticulos(); // si no hay marcados, solo consulta
      }
    } else {
      this.obtenerArticulos(); // si no hay nada, consulta normal
    }
  }

  obtenerArticulos() {
    this.descargoService.obtenerArticulos(this.anioMovimiento, this.numMovimiento).subscribe({
      next: (data) => {
        this.datosTabla = data;
      },
      error: () => {
        alert('❌ Error al obtener artículos');
        this.datosTabla = [];
      }
    });
  }

  limpiarCampos() {
    this.anioMovimiento = 2025;
    this.numMovimiento = 190;
    this.datosTabla = [];
  }
}
