import { TareaDTO } from "./tarea.model";

export interface ProyectoDTO {
    id?: number;
    nombre: string;
    descripcion: string;
    tareas?: TareaDTO[];
}