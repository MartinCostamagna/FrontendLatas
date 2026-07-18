import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Caja } from '../interfaces/lata.interface';

@Injectable({ providedIn: 'root' })
export class CajaService {
    private apiUrl = 'https://backendlatas-production.up.railway.app/cajas';

    constructor(private http: HttpClient) { }

    obtenerCajas(): Observable<Caja[]> {
        return this.http.get<Caja[]>(this.apiUrl);
    }

    registrarCaja(caja: Caja): Observable<Caja> {
        const token = localStorage.getItem('auth_token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.post<Caja>(this.apiUrl, caja, { headers });
    }

    actualizarCaja(numeroDeCaja: number, caja: Partial<Caja>): Observable<Caja> {
        const token = localStorage.getItem('auth_token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.patch<Caja>(`${this.apiUrl}/${numeroDeCaja}`, caja, { headers });
    }
}