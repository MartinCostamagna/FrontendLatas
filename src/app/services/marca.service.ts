import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marca } from '../interfaces/lata.interface';

@Injectable({ providedIn: 'root' })
export class MarcaService {
    private apiUrl = 'http://localhost:3000/marcas';

    constructor(private http: HttpClient) { }

    obtenerMarcas(): Observable<Marca[]> {
        return this.http.get<Marca[]>(this.apiUrl);
    }

    registrarMarca(marca: Marca): Observable<Marca> {
        const token = localStorage.getItem('auth_token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.post<Marca>(this.apiUrl, marca, { headers });
    }
}