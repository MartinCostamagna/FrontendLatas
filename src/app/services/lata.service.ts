import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lata } from '../interfaces/lata.interface';

@Injectable({ providedIn: 'root' })
export class LataService {
    private apiUrl = 'https://backendlatas-production.up.railway.app/latas';

    constructor(private http: HttpClient) { }

    registrarLata(lata: Lata): Observable<Lata> {
        return this.http.post<Lata>(this.apiUrl, lata);
    }

    registrarLataFormData(formData: FormData): Observable<any> {
        const token = localStorage.getItem('auth_token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.post<any>(this.apiUrl, formData, { headers });
    }

    obtenerLatas(): Observable<Lata[]> {
        return this.http.get<Lata[]>(this.apiUrl);
    }

    obtenerLataPorId(id: number): Observable<Lata> {
        return this.http.get<Lata>(`${this.apiUrl}/${id}`);
    }

    actualizarLata(id: number, datosAActualizar: any): Observable<Lata> {
        const token = localStorage.getItem('auth_token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.patch<Lata>(`${this.apiUrl}/${id}`, datosAActualizar, { headers });
    }

    obtenerLataRandom(): Observable<Lata> {
        return this.http.get<Lata>(`${this.apiUrl}/random`);
    }

    obtenerUltimasLatas(): Observable<Lata[]> {
        return this.http.get<Lata[]>(`${this.apiUrl}/ultimas`);
    }

    obtenerEstadisticas(): Observable<{ cantidadLatas: number, cantidadPaises: number }> {
        return this.http.get<{ cantidadLatas: number, cantidadPaises: number }>(`${this.apiUrl}/estadisticas`);
    }
}