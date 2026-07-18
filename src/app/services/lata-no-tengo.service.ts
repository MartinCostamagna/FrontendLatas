import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LataNoTengo } from '../interfaces/lata-no-tengo.interface';

@Injectable({ providedIn: 'root' })
export class LataNoTengoService {
    private apiUrl = 'https://backendlatas-production.up.railway.app/lata-no-tengo';

    constructor(private http: HttpClient) { }

    registrarLataNoTengo(formData: FormData): Observable<any> {
        const token = localStorage.getItem('auth_token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.post<any>(this.apiUrl, formData, { headers });
    }

    obtenerLatasNoTengo(): Observable<LataNoTengo[]> {
        return this.http.get<LataNoTengo[]>(this.apiUrl);
    }

    obtenerLataNoTengoPorId(id: number): Observable<LataNoTengo> {
        return this.http.get<LataNoTengo>(`${this.apiUrl}/${id}`);
    }

    eliminarLataNoTengo(id: number): Observable<any> {
        const token = localStorage.getItem('auth_token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
    }

    actualizarLataNoTengo(id: number, datos: Partial<LataNoTengo>): Observable<LataNoTengo> {
        const token = localStorage.getItem('auth_token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.patch<LataNoTengo>(`${this.apiUrl}/${id}`, datos, { headers });
    }
}