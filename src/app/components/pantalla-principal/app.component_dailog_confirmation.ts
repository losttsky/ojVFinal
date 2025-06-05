import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-confirmacion',
  standalone: true,
  imports: [MatButtonModule, CommonModule],
  template: `
    <h2>Confirmación</h2>
    <p>¿Está seguro de que desea salir?</p>
    <div class="dialog-actions">
      <button class="button_cancelar" mat-button (click)="onCancel()">Cancelar</button>
      <button class="button_salir" mat-button color="warn" (click)="onConfirm()">Salir</button>
    </div>
  `,
  styles: [`
    *{
        font-family: 'Arial', sans-serif;
    }
    h2 {
      padding-left: 30px;
    }
    p{
        padding-left: 30px;
    }
    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }
    .button_cancelar {
        margin-right: 10px; 
        border-radius: 5px; /* Bordes redondeados */
    }
    .button_salir{
        margin-right: 10px;
        border-radius: 5px; /* Bordes redondeados */
    }
    .button_cancelar:hover{
        background-color: rgba(224, 11, 0, 0.42); /* Cambia el color de fondo al pasar el mouse */
    }
    .button_salir:hover{
        background-color: rgba(0, 80, 155, 0.42); /* Cambia el color de fondo al pasar el mouse */
        border-radius: 5px; /* Bordes redondeados */
        margin-right: 10px;
    }
  `]
})
export class DialogConfirmacionComponent {
  constructor(@Inject(MatDialogRef) public dialogRef: MatDialogRef<DialogConfirmacionComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
