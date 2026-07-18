import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tamano } from '../interfaces/lata.interface';

@Injectable({ providedIn: 'root' })
export class TamanoService {
    private apiUrl = 'https://backendlatas-production.up.railway.app/tamanos';

    constructor(private http: HttpClient) { }

    obtenerTamanos(): Observable<Tamano[]> {
        return this.http.get<Tamano[]>(this.apiUrl);
    }

    registrarTamano(tamano: Tamano): Observable<Tamano> {
        const token = localStorage.getItem('auth_token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.post<Tamano>(this.apiUrl, tamano, { headers });
    }
}