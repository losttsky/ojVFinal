import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import { MovimientosESService } from '../../../services/movimientosEs.service';
@Component({
  selector: 'app-movimientos-entrada-salida',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movimientos_entrada_salida.component.html',
  styleUrls: ['./movimientos_entrada_salida.component.css'],
  providers: [MovimientosESService],
})
export class MovimientosEntradaSalidaComponent {
  /*   dependencia = 'JUZGADO CUARTO…';  
    marca       = 'XTECH';
    modelo      = 'XTK130';
    serie       = 'INC2303819802';
    anioMovimiento = 2023;
    tallerEntrega = 'TALLER DE MANTENIMIENTO';
    numMovimiento = 123456;
    fechaOperacion = new Date();
    nombreDescargo = 'JUAN PEREZ';
    lugarDescargo = 'LUGAR DE DESCARGO';
    usuarioRecibido = 'MARIA LOPEZ';
    tecnicoEntrega = 'CARLOS GARCIA';
    lugarEntrega = 'LUGAR DE ENTREGA';
    area = 'AREA DE MANTENIMIENTO';
    departamento = 'DEPARTAMENTO DE TECNOLOGIA';
    municipio = 'MUNICIPIO DE TECNOLOGIA';
    observaciones = 'Observaciones sobre el movimiento'; */

  /*   anioMovimiento: number | null = 2025;
    numMovimiento: number | null = 1; */
  tallerEntrega: string = '';
  fechaOperacion: string | null = '';
  nombreDescargo: string = '';
  lugarDescargo: string = '';
  usuarioRecibido: string = '';
  tecnicoEntrega: string = '';
  lugarEntrega: string = '';
  area: string = '';
  departamento: string = '';
  municipio: string = '';
  dependencia: string = '';
  observaciones: string = '';
  marca: string = '';
  modelo: string = '';
  cantidad: number | null = 1;
  serie: string = '';
  numMovimiento = 123;
  anioMovimiento = 2025;
  hojaResponsabilidad: string = '';

  articulos: any[] = [
    {
      grupo: '',
      subgrupo: '',
      articulo: '',
      cantidad: '',
      descripcion: '',
    },
  ];

  agregarArticulo() {
    this.articulos.push({
      grupo: '',
      subgrupo: '',
      articulo: '',
      cantidad: '',
      descripcion: '',
      marca: '',
      modelo: '',
      serie: '',
    });
  }

  constructor(
    private http: HttpClient,
    private movimientosService: MovimientosESService
  ) {}

  private obtenerDatosMovimiento() {
    return {
      anioMovimiento: this.anioMovimiento,
      numMovimiento: this.numMovimiento,
      fechaOperacion: this.fechaOperacion,
      usuarioRecibido: this.usuarioRecibido,
      tecnicoEntrega: this.tecnicoEntrega,
      lugarEntrega: this.lugarEntrega,
      nombreDescargo: this.nombreDescargo,
      lugarDescargo: this.lugarDescargo,
      area: this.area,
      dependencia: this.dependencia,
      municipio: this.municipio,
      departamento: this.departamento,
      observaciones: this.observaciones,
      marca: this.marca,
      modelo: this.modelo,
      serie: this.serie,
      holaResponsabilidad: this.hojaResponsabilidad,
      articulos: this.articulos,
    };
  }

  exportWord() {
    const datos = this.obtenerDatosMovimiento();

    // Ya no llamamos al backend: this.movimientosService.guardarMovimiento(...)

    // Generar Word directamente
    this.http.get('/assets/template.docx', { responseType: 'blob' }).subscribe(
      (blob) => {
        blob.arrayBuffer().then((buffer) => {
          let zip: PizZip;
          try {
            zip = new PizZip(buffer);
          } catch (e) {
            console.error('❌ No es un ZIP válido:', e);
            return;
          }

          const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
          });

          const render_template = this.articulos[0];

          doc.setData({
            no_referencia: String(this.numMovimiento),
            anio_actual: String(this.anioMovimiento),
            fecha: this.fechaOperacion || '',
            dependencia: this.dependencia,
            departamento: this.departamento,
            municipio: this.municipio,
            inventario: render_template.articulo,
            cantidad: render_template.cantidad,
            dispositivo: render_template.descripcion,
            marca: this.marca,
            modelo: this.modelo,
            serie: this.serie,
            persona_entrega: this.tecnicoEntrega,
            usuario_recibido: this.usuarioRecibido,
            dia: new Date(this.fechaOperacion || '').toLocaleDateString(
              'es-ES',
              {
                weekday: 'long',
              }
            ),
            tecnico: this.tecnicoEntrega,
          });

          try {
            doc.render();
          } catch (error: any) {
            const e = error;
            console.log(
              'Error al renderizar el documento:',
              JSON.stringify(
                {
                  message: e.message,
                  name: e.name,
                  stack: e.stack,
                  properties: e.properties,
                },
                null,
                2
              )
            );
            throw error;
          }

          const out = doc.getZip().generate({ type: 'uint8array' });
          const blobOut = new Blob([out], {
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          });

          saveAs(blobOut, `Nota_Responsabilidad_${this.numMovimiento}.docx`);
        });
      },
      (err) => console.error('❌ Error al descargar la plantilla:', err)
    );
  }
}
