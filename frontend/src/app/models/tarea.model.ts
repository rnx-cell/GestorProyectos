export enum TareaEstado {
    SIN_EMPEZAR = "SIN_EMPEZAR",
    EN_PROCESO = "EN_PROCESO",
    LISTO = "LISTO"
}

export interface TareaDTO {
    id?: number;
    titulo: string;
    descripcion?: string;
    estado?: TareaEstado;
    fecha?: Date;
    proyectoId?: number;
}