import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Especialidad } from '../interfaces/lata.interface';

@Injectable({ providedIn: 'root' })
export class EspecialidadService {
    private apiUrl = 'http://localhost:3000/especialidades';

    constructor(private http: HttpClient) { }

    obtenerEspecialidades(): Observable<Especialidad[]> {
        return this.http.get<Especialidad[]>(this.apiUrl);
    }

    registrarEspecialidad(especialidad: Especialidad): Observable<Especialidad> {
        const token = localStorage.getItem('auth_token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.post<Especialidad>(this.apiUrl, especialidad, { headers });
    }
}