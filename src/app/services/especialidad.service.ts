import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Especialidad } from '../interfaces/lata.interface';

@Injectable({ providedIn: 'root' })
export class EspecialidadService {
    private apiUrl = 'http://localhost:3000/especialidades';

    constructor(private http: HttpClient) { }

    obtenerEspecialidades(): Observable<Especialidad[]> {
        return this.http.get<Especialidad[]>(this.apiUrl);
    }
}