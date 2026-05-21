import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Caja } from '../interfaces/lata.interface';

@Injectable({ providedIn: 'root' })
export class CajaService {
    private apiUrl = 'http://localhost:3000/cajas';

    constructor(private http: HttpClient) { }

    obtenerCajas(): Observable<Caja[]> {
        return this.http.get<Caja[]>(this.apiUrl);
    }
}