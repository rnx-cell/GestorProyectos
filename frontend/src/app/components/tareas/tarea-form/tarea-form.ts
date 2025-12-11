import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ProyectoDTO } from '../../../models/proyecto.model';
import { TareaService } from '../../../services/tarea.service';
import { ProyectoService } from '../../../services/proyecto.service';
import { TareaDTO, TareaEstado } from '../../../models/tarea.model';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarea-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './tarea-form.html',
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class TareaForm implements OnInit {
  form!: FormGroup;
  proyectos: ProyectoDTO[] = [];
  estados = Object.values(TareaEstado);
  estadoLabels: Record<string, string> = {
    SIN_EMPEZAR: "Sin empezar",
    EN_PROCESO: "En proceso",
    LISTO: "Listo"
  };

  constructor(
    private fb: FormBuilder,
    private servicio: TareaService,
    private proyService: ProyectoService,
    private dialogRef: MatDialogRef<TareaForm>,
    @Inject(MAT_DIALOG_DATA) public data: { tarea?: TareaDTO }
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
    titulo: [this.data.tarea?.titulo || '', Validators.required],
    descripcion: [this.data.tarea?.descripcion || ''],

    estado: [
      this.data.tarea?.estado || TareaEstado.SIN_EMPEZAR,
      Validators.required
    ],

    fecha: [
      this.data.tarea?.fecha ? new Date(this.data.tarea.fecha) : null,
      Validators.required
    ],

    proyectoId: [this.data.tarea?.proyectoId || '', Validators.required]
  });


    this.proyService.getAll().subscribe({
      next: data => this.proyectos = data,
      error: err => console.error(err)
    });
  }

  save() {
    if (this.form.invalid) return;
    const payload: TareaDTO = this.form.value;
    if (this.data.tarea?.id) {
      this.servicio.update(this.data.tarea.id, payload).subscribe({
        next: res => this.dialogRef.close(true),
        error: err => console.error(err)
      });
    } else {
      this.servicio.create(payload).subscribe({
        next: res => this.dialogRef.close(true),
        error: err => console.error(err)
      });
    }
  }

  close() {
    this.dialogRef.close(false);
  }
}