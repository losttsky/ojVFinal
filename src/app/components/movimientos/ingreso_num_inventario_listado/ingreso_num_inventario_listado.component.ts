//modificar la hoja generada a la hoja base

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-movimientos-entrada-salida',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ingreso_num_inventario_listado.component.html',
  styleUrls: ['./ingreso_num_inventario_listado.component.css'],
})
export class IngresoNumeroInventarioListadoComponent {
  anioMovimiento: number | null = 2025;
  tallerEntrega: string = '';
  numMovimiento: number | null = 1;
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

  articulos: any[] = [
    {
      grupo: '',
      subgrupo: '',
      articulo: '',
      cantidad: '',
      descripcion: '',
      marca: '',
      modelo: '',
      serie: '',
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

  // Función para generar el PDF
  generarPDF() {
    const doc = new jsPDF();
    const logo = new Image();
    logo.src = '/assets/img/logo.png'; // Ruta del logo

    logo.onload = () => {
      // Agregar logo
      doc.addImage(logo, 'PNG', 10, 10, 40, 40);

      // Encabezado
      doc.setFontSize(12);
      doc.text('GERENCIA DE INFORMATICA', 75, 10);
      doc.text('ORGANISMO JUDICIAL', 80, 15);
      doc.setFontSize(16);
      doc.text('NOTA DE RESPONSABILIDAD', 65, 25);
      doc.setFontSize(10);
      doc.text(`Página 1 de 1`, 180, 10);
      doc.text(`Ref: T-${this.numMovimiento}-${this.anioMovimiento}`, 150, 15);

      // Espaciado entre encabezado y contenido
      let yPosition = 65;

      // Sección de datos generales
      doc.setFontSize(12);
      doc.text('DATOS GENERALES', 10, yPosition);
      yPosition += 10;

      doc.setFontSize(10);
      doc.text(`Fecha: ${this.fechaOperacion || ''}`, 10, yPosition);
      yPosition += 7;
      doc.text(`Dependencia: ${this.dependencia || ''}`, 10, yPosition);
      yPosition += 7;
      doc.text(
        `Ubicación: ${this.departamento || ''} - ${this.municipio || ''}`,
        10,
        yPosition
      );
      yPosition += 14; // Espacio después de esta sección

      // Sección de Información del Equipo
      doc.setFontSize(12);
      doc.text('INFORMACIÓN DEL EQUIPO', 10, yPosition);
      yPosition += 10;

      // Crear tabla de artículos con Marca, Modelo y Serie
      autoTable(doc, {
        startY: yPosition,
        head: [
          ['Inventario', 'Cant', 'Dispositivo', 'Marca', 'Modelo', 'Serie'],
        ],
        body: this.articulos.map((a) => [
          a.articulo || '',
          a.cantidad || '',
          a.descripcion || '',
          a.marca || '', // Marca
          a.modelo || '', // Modelo
          a.serie || '', // Serie
        ]),
        theme: 'grid',
        headStyles: { fillColor: [50, 50, 50] },
        styles: { fontSize: 10 },
      });

      // Añadir un poco de espacio después de la tabla
      yPosition = (doc as any).lastAutoTable.finalY + 10;

      // Nota
      doc.text(
        `Nota: Cualquier transferencia de equipo debe ser notificada con anticipación.`,
        10,
        yPosition
      );
      yPosition += 10;

      // Firma
      doc.text('Persona que entrega:', 10, yPosition);
      doc.text(`${this.tecnicoEntrega || ''}`, 60, yPosition);
      yPosition += 10;

      doc.text('Persona responsable del equipo:', 10, yPosition);
      doc.text(`${this.usuarioRecibido || ''}`, 80, yPosition);

      // Guardar PDF
      doc.save(`Nota_Responsabilidad_${this.numMovimiento}.pdf`);
    };
  }
}
