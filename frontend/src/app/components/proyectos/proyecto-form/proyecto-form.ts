import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProyectoService } from '../../../services/proyecto.service';
import { ProyectoList } from '../proyecto-list/proyecto-list';
import { ProyectoDTO } from '../../../models/proyecto.model';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proyecto-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  standalone: true,
  templateUrl: './proyecto-form.html',
  styleUrl: './proyecto-form.css',
})
export class ProyectoForm implements OnInit{
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private servicio: ProyectoService,
    private dialogRef: MatDialogRef<ProyectoList>,
    @Inject(MAT_DIALOG_DATA) public data: { proyecto?: ProyectoDTO}
  ){}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: [this.data.proyecto?.nombre || '', Validators.required],
      descripcion: [this.data.proyecto?.descripcion || ''],
      tareas: [this.data.proyecto?.tareas || '']
    });
  }

  save() {
    if (this.form.invalid) return;
    const payload: ProyectoDTO = this.form.value;
    if(this.data.proyecto?.id) {
      this.servicio.update(this.data.proyecto.id, payload).subscribe({
        next: res => this.dialogRef.close(true),
        error: err => console.error(err)
      });
    } else{
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
