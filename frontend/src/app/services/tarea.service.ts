import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { TareaDTO } from "../models/tarea.model";
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root'})
export class TareaService {
    private base = `${environment.apiUrl}/tareas` //parametrizado para encontrar el backend
    constructor(private http: HttpClient) {}

    getAll(): Observable<TareaDTO[]> {
        return this.http.get<TareaDTO[]>(this.base).pipe(catchError(this.handleError));
    }

    getById(id: number){
        return this.http.get<TareaDTO>(`${this.base}/${id}`).pipe(catchError(this.handleError));
    }

    create(tar: TareaDTO){
        return this.http.post<TareaDTO>(this.base, tar).pipe(catchError(this.handleError));
    }

    update(id: number, tar: TareaDTO){
        return this.http.put<TareaDTO>(`${this.base}/${id}`, tar).pipe(catchError(this.handleError));
    }

    delete(id: number){
        return this.http.delete<TareaDTO>(`${this.base}/${id}`).pipe(catchError(this.handleError));
    }

    private handleError(err: any){
        console.error(err);
        return throwError(() => err);
    }
}