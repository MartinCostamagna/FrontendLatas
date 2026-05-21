import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pais } from '../interfaces/lata.interface';

@Injectable({ providedIn: 'root' })
export class PaisService {
    private apiUrl = 'http://localhost:3000/paises';

    constructor(private http: HttpClient) { }

    obtenerPaises(): Observable<Pais[]> {
        return this.http.get<Pais[]>(this.apiUrl);
    }
}