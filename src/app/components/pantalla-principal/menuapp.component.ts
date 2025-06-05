import { Component, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogConfirmacionComponent } from './app.component_dailog_confirmation';

//Importamos la pantalla default
import { DefaultComponent } from '../default/default.component';

// Importamos los submenús de Catalogos
import { GrupoComponent } from '../catalogos/grupo/grupo.component';
import { SubGrupoComponent } from '../catalogos/subgrupo/subgrupo.component';
import { MovimientosComponent } from '../catalogos/movimientos/movimientos.component';
import { MarcaComponent } from '../catalogos/marca/marca.component';
import { ModelosComponent } from '../catalogos/modelos/modelos.component';
import { MedidasComponent } from '../catalogos/medidas/medidas.component';
import { LugarEntregaComponent } from '../catalogos/lugar_de_entrega/lugar_de_entrega.component';
import { AreaComponent } from '../catalogos/area/area.component';
import { EntregaEquipoComponent } from '../catalogos/entrega_equipo/entrega_equipo.component';
import { EstadoDispositivoComponent } from '../catalogos/estado_del_dispositivo/estado_del_dispositivo.component';
import { TecnicosComponent } from '../catalogos/tecnicos/tecnicos.component';
import { DependenciasComponent } from '../catalogos/dependencias/dependencias.component';
import { TecnicosDelGITComponent } from '../catalogos/tecnicos_del_git/tecnicos_del_git.component';

// Importamos los submenús de Ingreso de Artículos
import { ArticulosComponent } from '../ingreso_articulos/articulos/articulos.component';

// Importamos los submenús de Movimientos
import { MovimientosEntradaSalidaComponent } from '../movimientos/movimientos_entrada_salida/movimientos_entrada_salida.component';

// Importamos los submenús de Descargo
import { DescargoListadoComponent } from '../descargo/descargo_listado/descargo_listado.component';

// Importamos los submenús de Consultas
import { RangoFechasComponent } from '../consultas/reporte_rango_fecha/rango_fechas.component';
import { BusquedaPorSerieComponent } from '../consultas/busqueda_por_serie/busqueda_serie.component';

@Component({
  selector: 'app-pantalla-principal',
  standalone: true,
    imports: [
    CommonModule,
    FormsModule,      // para [(ngModel)]
    RouterModule,     // si usas routerLink o navegaciones
    MatDialogModule,  // para abrir diálogos
  ],
  templateUrl: './menuapp.component.html',
  styleUrls: ['./menuapp.component.css'],
})
export class MenuAppComponent {
  // Controla la visibilidad de la barra lateral
  mostrarBarra = false;

  // Controla la visibilidad del segundo offcanvas (submenús)
  mostrarSubmenu = false;

  // Almacena los submenús actuales
  submenus: string[] = [];

  // Título del submenu actual
  submenuTitulo: string = '';

  //Cargar componente por defecto 
  submenuSeleccionado: Type<any> = DefaultComponent;

  constructor(private dialog: MatDialog, private router: Router) {}

  // Alterna la visibilidad de la barra lateral
  toggleBarra() {
    this.mostrarBarra = !this.mostrarBarra;
  }

  // Maneja la selección de módulos principales y carga los submenús correspondientes
  seleccionarSubmenu(nombre: string) {
    this.mostrarBarra = false;

    // Carga el componente Seleccionado segun el nombre del submenú
    switch (nombre) {
      case 'Inicio':
        this.submenuSeleccionado = DefaultComponent;
        break;
      case 'Grupo':
        this.submenuSeleccionado = GrupoComponent;
        break;
      case 'Subgrupo':
        this.submenuSeleccionado = SubGrupoComponent;
        break;
      case 'Movimientos':
        this.submenuSeleccionado = MovimientosComponent;
        break;
      case 'Marca':
        this.submenuSeleccionado = MarcaComponent;
        break;
      case 'Modelo':
        this.submenuSeleccionado = ModelosComponent;
        break;
      case 'Medidas':
        this.submenuSeleccionado = MedidasComponent;
        break;
      case 'Lugar de Entrega':
        this.submenuSeleccionado = LugarEntregaComponent;
        break;
      case 'Área':
        this.submenuSeleccionado = AreaComponent;
        break;
      case 'Entrega Equipo':
        this.submenuSeleccionado = EntregaEquipoComponent;
        break;
      case 'Estado del Dispositivo':
        this.submenuSeleccionado = EstadoDispositivoComponent;
        break;
      case 'Técnicos':
        this.submenuSeleccionado = TecnicosComponent;
        break;
      case 'Dependencias':
        this.submenuSeleccionado = DependenciasComponent;
        break;
      case 'Técnicos del GIT':
        this.submenuSeleccionado = TecnicosDelGITComponent;
        break;
      case 'Artículos':
        this.submenuSeleccionado = ArticulosComponent;
        break;
      case 'Movimientos de Entrada y Salida':
        this.submenuSeleccionado = MovimientosEntradaSalidaComponent;
        break;
      case 'Descargo por Listado':
        this.submenuSeleccionado = DescargoListadoComponent;
        break;
      case 'Reportes por Rango de Fecha':
        this.submenuSeleccionado = RangoFechasComponent;
        break;
      case 'Búsqueda por Serie':
        this.submenuSeleccionado = BusquedaPorSerieComponent;
        break;
      default:
        this.submenuSeleccionado = DefaultComponent; // Si no hay coincidencia, no se carga ningún componente
        break;
    }
    //Cambia los valores de los textos en las cartas
    this.submenuTitulo = nombre;
    this.mostrarSubmenu = true; // Mostrar el submenú
  }

  // Función para confirmar la salida
  confirmarSalida(): void {
    const dialogRef = this.dialog.open(DialogConfirmacionComponent, {
      width: '450px',
      height: '200px',
      panelClass: 'dialog-confirmacion',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        localStorage.removeItem('loggedIn');
        this.router.navigate(['/login']);
      }
    });
  }

  // Submenús por categoría
  catalogos = [
    'Grupo',
    'Subgrupo',
    'Movimientos',
    'Marca',
    'Modelo',
    'Medidas',
    'Lugar de Entrega',
    'Área',
    'Entrega Equipo',
    'Estado del Dispositivo',
    'Técnicos',
    'Dependencias',
    'Técnicos del GIT',
  ];
  ingresoArticulos = ['Artículos'];
  Movimientos = [
    'Movimientos de Entrada y Salida'
  ];
  descargo = ['Descargo por Listado'];
  consultas = ['Reportes por Rango de Fecha', 'Búsqueda por Serie'];
}
