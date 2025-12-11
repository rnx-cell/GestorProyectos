import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ProyectoDTO } from '../models/proyecto.model';

@Injectable({ providedIn: 'root' })
export class ProyectoService {
    private base = `${environment.apiUrl}/proyectos`; //parametrizado para encontrar el backend
    constructor(private http: HttpClient){}

    getAll(): Observable<ProyectoDTO[]> {
        return this.http.get<ProyectoDTO[]>(this.base).pipe(catchError(this.handleError));
    }

    getById(id:number){
        return this.http.get<ProyectoDTO>(`${this.base}/${id}`).pipe(catchError(this.handleError));
    }

    create(proy: ProyectoDTO) {
        return this.http.post<ProyectoDTO>(this.base, proy).pipe(catchError(this.handleError));
    }

    update(id: number, proy: ProyectoDTO){
        return this.http.put<ProyectoDTO>(`${this.base}/${id}`, proy).pipe(catchError(this.handleError));
    }

    delete(id: number){
        return this.http.delete<ProyectoDTO>(`${this.base}/${id}`).pipe(catchError(this.handleError));
    }

    private handleError(err: any){
        console.error(err);
        return throwError(() => err);
    }
}