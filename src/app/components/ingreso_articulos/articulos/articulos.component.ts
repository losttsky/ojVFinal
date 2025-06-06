import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para usar ngModel
import { ArticulosService } from '../../../services/articulos.service';

@Component({
  selector: 'app-articulos',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importamos los módulos necesarios
  templateUrl: './articulos.component.html', // HTML del componente
  styleUrls: ['./articulos.component.css'], // Estilos del componente
  providers: [ArticulosService] // Proveedor del servicio de artículos
})
export class ArticulosComponent implements OnInit {
  // Dropdowns
  grupos: any[] = [];
  subgrupos: any[] = [];
  medidas: any[] = [];
  marcas: any[] = [];
  modelos: any[] = [];
  estados: any[] = [];
  tecnicos: any[] = [];
  nits: any[] = [];

  // Datos seleccionados
  grupoSeleccionado: string = '';
  subgrupoSeleccionado: string = '';
  articulo: number | null = null;
  descripcion: string = '';
  ingresoInventario: boolean = false;
  taller: boolean = false;
  repuestos: boolean = false;
  medidaSeleccionada: string = '';
  marcaSeleccionada: string = '';
  modeloSeleccionado: string = '';
  serie: string = '';
  entregaTallerPor: string = '';
  estadoDispositivo: string = '';
  fechaIngresoTaller: Date | null = null;
  existenciaMinima: number | null = null;
  existenciaMaxima: number | null = null;
  serieFactura: string = '';
  nitSeleccionado: string = '';
  numeroForma: string = '';
  existencia: number = 0;
  numeroInventario: string = '';

  constructor(private articulosService: ArticulosService) {}

  ngOnInit() {
    this.articulosService.getGrupos().subscribe((data: any) => this.grupos = data);
    this.articulosService.getSubgrupos().subscribe((data: any) => this.subgrupos = data);
    this.articulosService.getMedidas().subscribe((data: any) => this.medidas = data);
    this.articulosService.getMarcas().subscribe((data: any) => this.marcas = data);
    this.articulosService.getModelos().subscribe((data: any) => this.modelos = data);
    this.articulosService.getEstados().subscribe((data: any) => this.estadoDispositivo = data);
    this.articulosService.getTecnicos().subscribe((data: any) => this.tecnicos = data);
    this.articulosService.getNits().subscribe((data: any) => this.nits = data);
  }

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
    // Logica para implementar el ingreso del artículo
    const data = {
      grupo: this.grupoSeleccionado,
      subgrupo: this.subgrupoSeleccionado,
      articulo: this.articulo,
      descripcion: this.descripcion,
      ingresoInventario: this.ingresoInventario,
      taller: this.taller,
      repuestos: this.repuestos,
      medida: this.medidaSeleccionada,
      marca: this.marcaSeleccionada,
      modelo: this.modeloSeleccionado,
      serie: this.serie,
      entregaTallerPor: this.entregaTallerPor,
      estadoDispositivo: this.estadoDispositivo,
      fechaIngresoTaller: this.fechaIngresoTaller,
      existenciaMinima: this.existenciaMinima,
      existenciaMaxima: this.existenciaMaxima,
      serieFactura: this.serieFactura,
      nit: this.nitSeleccionado,
      numeroForma: this.numeroForma,
      existencia: this.existencia,
      numeroInventario: this.numeroInventario
    }
    this.articulosService.ingresarArticulo(data).subscribe(
      response => {
        console.log('Artículo ingresado con éxito:', response);
        //Mensaje de ingreso de articulos exitoso con alert
        alert('Artículo ingresado con éxito');
        
      },
      error => {
        console.error('Error al ingresar el artículo:', error);
        //Mensaje de error al ingresar el articulo con alert
        alert('Error al ingresar el artículo: ' + error.message);
      }
    );
  }
}