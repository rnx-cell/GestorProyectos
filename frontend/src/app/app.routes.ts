import { Routes } from '@angular/router';
import { ProyectoList } from './components/proyectos/proyecto-list/proyecto-list';
import { TareaList } from './components/tareas/tarea-list/tarea-list';

export const routes: Routes = [
  { path: '', redirectTo: 'proyectos', pathMatch: 'full' },
  { path: 'proyectos', component: ProyectoList },
  { path: 'tareas', component: TareaList }
];