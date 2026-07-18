import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EdicionEspecial } from '../interfaces/lata.interface';

@Injectable({ providedIn: 'root' })
export class EdicionEspecialService {
    private apiUrl = 'https://backendlatas-production.up.railway.app/ediciones-especiales';

    constructor(private http: HttpClient) { }

    obtenerEdicionesEspeciales(): Observable<EdicionEspecial[]> {
        return this.http.get<EdicionEspecial[]>(this.apiUrl);
    }

    registrarEdicionEspecial(edicion: EdicionEspecial): Observable<EdicionEspecial> {
        const token = localStorage.getItem('auth_token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.post<EdicionEspecial>(this.apiUrl, edicion, { headers });
    }
}