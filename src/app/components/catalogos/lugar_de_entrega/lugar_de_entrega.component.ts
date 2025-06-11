import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LugarEntregaService } from '../../../services/lugar_de_entrega.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-lugar_de_entrega',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor],
  templateUrl: './lugar_de_entrega.component.html',
  styleUrls: ['./lugar_de_entrega.component.css'],
  providers: [LugarEntregaService]
})
export class LugarEntregaComponent {
  idLugar: string = '';
  descripcion: string = '';
  lugares: any[] = [];
  mostrarModal = false;

  constructor(private lugarService: LugarEntregaService) {}

  buscarLugarEntrega() {
    // Si hay datos en el modal, los muestra, si no muestra un mensaje
    if (this.idLugar || this.descripcion) {
      this.lugarService
        .buscar(this.idLugar, this.descripcion)
        .subscribe((data: any) => {
          this.lugares = data;
          if (this.lugares.length > 0) {
            this.mostrarModal = true;
          } else {
            alert(
              'No se encontraron lugares de entrega con los criterios especificados.'
            );
          }
        });
    } else {
      this.lugares = [];
      alert(
        'Por favor, ingrese un ID de lugar o una descripción para buscar.'
      );
    }
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  limpiarCampo(campo: string) {
    if (campo in this) {
      (this as any)[campo] = '';
    }
  }
}
