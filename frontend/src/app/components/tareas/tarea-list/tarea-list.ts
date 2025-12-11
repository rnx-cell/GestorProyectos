import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ViewDialogComponent } from '../../../shared/view-dialog.component';
import { TareaDTO } from '../../../models/tarea.model';
import { TareaService } from '../../../services/tarea.service';
import { TareaForm } from '../tarea-form/tarea-form';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tarea-list',
  standalone: true,
  imports: [CommonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatDialogModule],
  templateUrl: './tarea-list.html',
  styleUrls: ['./tarea-list.css'],
})
export class TareaList implements OnInit{
  displayedColumns: string[] = ['id', 'titulo', 'descripcion', 'estado', 'fecha', 'proyectoId', 'actions'];
  dataSource = new MatTableDataSource<TareaDTO>([]);
  estados = ["SIN_EMPEZAR", "EN_PROCESO", "LISTO"];
  estadoLabels: Record<string, string> = {
    SIN_EMPEZAR: "Sin empezar",
    EN_PROCESO: "En proceso",
    LISTO: "Listo"
  };


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private servicio: TareaService, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.servicio.getAll().subscribe({
      next: data => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: err => console.error(err)
    });
  }

  openCreate(){
    const dialogRef = this.dialog.open(TareaForm, {width: '400px', data: { }});
    dialogRef.afterClosed().subscribe(res => {
      if (res) this.load();
    });
  }

  edit(row: TareaDTO){
    const dialogRef = this.dialog.open(TareaForm, {width: '400px', data: {tarea: row}});
    dialogRef.afterClosed().subscribe(res => {
      if (res) this.load();
    });
  }

  view(id?: number){
    if (!id) return;
    this.servicio.getById(id).subscribe({
      next: data => {
        this.dialog.open(ViewDialogComponent, { width: '500px', data: { title: `Tarea ${id}`, entity: data }});
      },
      error: err => console.error(err)
    });
  }

  delete(id?: number) {
    if (!id) return;
    if (!confirm('Eliminar tarea?')) return;
    this.servicio.delete(id).subscribe({
      next: () => this.load(),
      error: err => console.error(err)
    });
  }

  ordenarPor(campo: string) {
    const tareas = [...this.dataSource.data];  // copiar arreglo

    if (campo === 'proyecto') {
      tareas.sort((a, b) => {
        const pa = a.proyectoId ?? 0;
        const pb = b.proyectoId ?? 0;
        return pa - pb; // ordena de menor a mayor proyectoId
      });
    }

    if (campo === 'fecha') {
      tareas.sort((a, b) => {
        const fa = a.fecha ? new Date(a.fecha).getTime() : 0;
        const fb = b.fecha ? new Date(b.fecha).getTime() : 0;
        return fa - fb;
      });
    }

    this.dataSource.data = tareas;
  }

  goToProyecto(id?: number) {
    this.router.navigate(['/proyectos'], { queryParams: { id } });
  }
}