import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProyectoDTO } from '../../../models/proyecto.model';
import { ProyectoService } from '../../../services/proyecto.service';
import { ViewDialogComponent } from '../../../shared/view-dialog.component';
import { ProyectoForm } from '../proyecto-form/proyecto-form';
import { Router } from '@angular/router';


@Component({
  selector: 'app-proyecto-list',
  imports: [
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  standalone: true,
  templateUrl: './proyecto-list.html',
  styleUrl: './proyecto-list.css',
})
export class ProyectoList implements OnInit {
  displayedColumns: string[] = ['id','nombre','descripcion', 'tareas', 'actions'];
  dataSource = new MatTableDataSource<ProyectoDTO>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private servicio: ProyectoService, private dialog: MatDialog, private router: Router) {}

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

  openCreate() {
    const dialogRef = this.dialog.open(ProyectoForm, { width: '400px', data: { }});
    dialogRef.afterClosed().subscribe(res => {
      if (res) this.load();
    });
  }

  edit(row: ProyectoDTO){
    const dialogRef = this.dialog.open(ProyectoForm, { width: '400px', data: { proyecto: row}});
    dialogRef.afterClosed().subscribe(res => {
      if (res) this.load();
    });
  }

  view(id?: number){
    if (!id) return;
    this.servicio.getById(id).subscribe({
      next: data => {
        this.dialog.open(ViewDialogComponent, {width: '500px', data: {title: `Proyecto ${id}`, entity: data}});
      },
      error: err => console.error(err)
    });
  }

  delete(id?: number){
    if (!id) return;
    if (!confirm('Eliminar departamento?')) return;
    this.servicio.delete(id).subscribe({
      next: () => this.load(),
      error: err => console.error(err)
    });
  }

  isArray(x: any): boolean {
    return Array.isArray(x);
  }

  goToTareas(proyectoId?: number) {
    this.router.navigate(['/tareas'], { queryParams: { proyectoId } });
  }
}
