import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Descripcion } from '../interfaces/lata.interface';

@Injectable({ providedIn: 'root' })
export class DescripcionService {
    private apiUrl = 'http://localhost:3000/descripciones';

    constructor(private http: HttpClient) { }

    obtenerDescripciones(): Observable<Descripcion[]> {
        return this.http.get<Descripcion[]>(this.apiUrl);
    }

    registrarDescripcion(descripcion: { texto: string }): Observable<Descripcion> {
        return this.http.post<Descripcion>(this.apiUrl, descripcion);
    }
}