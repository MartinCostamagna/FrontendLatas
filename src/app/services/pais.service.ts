import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pais } from '../interfaces/lata.interface';

@Injectable({ providedIn: 'root' })
export class PaisService {
    private apiUrl = 'https://backendlatas-production.up.railway.app/paises';

    constructor(private http: HttpClient) { }

    obtenerPaises(): Observable<Pais[]> {
        return this.http.get<Pais[]>(this.apiUrl);
    }

    registrarPais(pais: Pais): Observable<Pais> {
        const token = localStorage.getItem('auth_token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.post<Pais>(this.apiUrl, pais, { headers });
    }
}