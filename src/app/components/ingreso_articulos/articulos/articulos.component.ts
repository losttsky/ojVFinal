import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para usar ngModel

@Component({
  selector: 'app-articulos',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importamos los módulos necesarios
  templateUrl: './articulos.component.html', // HTML del componente
  styleUrls: ['./articulos.component.css'], // Estilos del componente
})
export class ArticulosComponent {
  grupoSeleccionado: string = ''; // Variable para el grupo
  subgrupoSeleccionado: string = ''; // Variable para el subgrupo
  articulo: number | null = null; // Variable para el artículo
  descripcion: string = ''; // Variable para la descripción
  ingresoInventario: boolean = false; // Estado de ingreso a inventario
  taller: boolean = false; // Estado de taller
  repuestos: boolean = false; // Estado de repuestos
  medidaSeleccionada: string = ''; // Variable para la medida seleccionada
  marcaSeleccionada: string = ''; // Variable para la marca seleccionada
  modeloSeleccionado: string = ''; // Variable para el modelo seleccionado
  serie: string = ''; // Variable para la serie
  entregaTallerPor: string = ''; // Persona que entrega al taller
  estadoDispositivo: string = ''; // Estado del dispositivo
  fechaIngresoTaller: Date | null = null; // Fecha de ingreso al taller
  existenciaMinima: number | null = null; // Existencia mínima
  existenciaMaxima: number | null = null; // Existencia máxima
  serieFactura: string = ''; // Serie de la factura
  nitSeleccionado: string = ''; // NIT seleccionado
  numeroForma: string = ''; // Número de forma
  existencia: number = 0; // Existencia de artículos
  numeroInventario: string = ''; // Número de inventario

  // Función para manejar el ingreso de artículos
  ingresar() {
    console.log('Ingresar artículo con:', {
      grupoSeleccionado: this.grupoSeleccionado,
      subgrupoSeleccionado: this.subgrupoSeleccionado,
      articulo: this.articulo,
      descripcion: this.descripcion,
      ingresoInventario: this.ingresoInventario,
      taller: this.taller,
      repuestos: this.repuestos,
      medidaSeleccionada: this.medidaSeleccionada,
      marcaSeleccionada: this.marcaSeleccionada,
      modeloSeleccionado: this.modeloSeleccionado,
      serie: this.serie,
      entregaTallerPor: this.entregaTallerPor,
      estadoDispositivo: this.estadoDispositivo,
      fechaIngresoTaller: this.fechaIngresoTaller,
      existenciaMinima: this.existenciaMinima,
      existenciaMaxima: this.existenciaMaxima,
      serieFactura: this.serieFactura,
      nitSeleccionado: this.nitSeleccionado,
      numeroForma: this.numeroForma,
      existencia: this.existencia,
      numeroInventario: this.numeroInventario,
    });
    // Aquí puedes agregar la lógica para ingresar el artículo en la base de datos
  }
}
