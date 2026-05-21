import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tamano } from '../interfaces/lata.interface';

@Injectable({ providedIn: 'root' })
export class TamanoService {
    private apiUrl = 'http://localhost:3000/tamanos';

    constructor(private http: HttpClient) { }

    obtenerTamanos(): Observable<Tamano[]> {
        return this.http.get<Tamano[]>(this.apiUrl);
    }
}