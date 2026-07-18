import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Descripcion } from '../interfaces/lata.interface';

@Injectable({ providedIn: 'root' })
export class DescripcionService {
    private apiUrl = 'https://backendlatas-production.up.railway.app/descripciones';

    constructor(private http: HttpClient) { }

    obtenerDescripciones(): Observable<Descripcion[]> {
        return this.http.get<Descripcion[]>(this.apiUrl);
    }

    registrarDescripcion(descripcion: { texto: string }): Observable<Descripcion> {
        const token = localStorage.getItem('auth_token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.post<any>(this.apiUrl, descripcion, { headers });
    }
}