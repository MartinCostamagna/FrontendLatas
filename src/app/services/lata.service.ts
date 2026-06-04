import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lata } from '../interfaces/lata.interface';

@Injectable({ providedIn: 'root' })
export class LataService {
    private apiUrl = 'http://localhost:3000/latas';

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
}