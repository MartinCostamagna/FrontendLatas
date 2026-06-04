import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sabor } from '../interfaces/lata.interface';

@Injectable({ providedIn: 'root' })
export class SaborService {
    private apiUrl = 'http://localhost:3000/sabores';

    constructor(private http: HttpClient) { }

    obtenerSabores(): Observable<Sabor[]> {
        return this.http.get<Sabor[]>(this.apiUrl);
    }

    registrarSabor(sabor: Sabor): Observable<Sabor> {
        const token = localStorage.getItem('auth_token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.post<Sabor>(this.apiUrl, sabor, { headers });
    }
}