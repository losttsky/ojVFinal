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
  providers: [ArticulosService], // Proveedor del servicio de artículos
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
  estadoDispositivo: any = null;
  fechaIngresoTaller: Date | null = null;
  existenciaMinima: number | null = null;
  existenciaMaxima: number | null = null;
  serieFactura: string = '';
  nitSeleccionado: any = null;
  numeroForma: string = '';
  existencia: number = 0;
  numeroInventario: string = '';

  constructor(private articulosService: ArticulosService) {}

  ngOnInit() {
    this.articulosService.getUltimoCodigoArticulo().subscribe(
      (data: any) => {
        this.articulo = data.NUEVO_CODIGO || 1;
      },
      (error) => {
        console.error('Error al obtener el último código:', error);
        this.articulo = 1; // fallback por si falla
      }
    );
    this.articulosService
      .getGrupos()
      .subscribe((data: any) => (this.grupos = data));
    this.articulosService
      .getSubgrupos()
      .subscribe((data: any) => (this.subgrupos = data));
    this.articulosService
      .getMedidas()
      .subscribe((data: any) => (this.medidas = data));
    this.articulosService
      .getMarcas()
      .subscribe((data: any) => (this.marcas = data));
    this.articulosService
      .getModelos()
      .subscribe((data: any) => (this.modelos = data));
    this.articulosService
      .getEstados()
      .subscribe((data: any) => (this.estados = data));
    this.articulosService
      .getTecnicos()
      .subscribe((data: any) => (this.tecnicos = data));
    this.articulosService
      .getNits()
      .subscribe((data: any) => (this.nits = data));
  }

  ingresar() {
    const estadoId = this.estadoDispositivo?.ESTADO_DISPOSITIVO || null;
    const nitValor = this.nitSeleccionado?.NIT || null;

    const data = {
      grupo: Number(this.grupoSeleccionado),
      subgrupo: Number(this.subgrupoSeleccionado),
      articulo: this.articulo,
      descripcion: this.descripcion,
      ingresoInventario: this.ingresoInventario,
      taller: this.taller,
      repuestos: this.repuestos,
      medida: Number(this.medidaSeleccionada),
      marca: Number(this.marcaSeleccionada),
      modelo: Number(this.modeloSeleccionado),
      serie: this.serie,
      entregaTallerPor: Number(this.entregaTallerPor),
      estadoDispositivo: estadoId,
      fechaIngresoTaller: this.fechaIngresoTaller,
      existenciaMinima: Number(this.existenciaMinima),
      existenciaMaxima: Number(this.existenciaMaxima),
      serieFactura: this.serieFactura,
      nit: nitValor,
      numF57: this.numeroForma,
      existencia: Number(this.existencia),
      numeroInventario: this.numeroInventario,
    };

    console.log('Ingresar artículo con:', data);

    this.articulosService.ingresarArticulo(data).subscribe(
      (response) => {
        alert('Artículo ingresado correctamente');
      },
      (error) => {
        console.error('Error al ingresar el artículo:', error);
        alert('Error al ingresar el artículo: ' + error.message);
      }
    );

  }
}
