import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sabor } from '../interfaces/lata.interface';

@Injectable({ providedIn: 'root' })
export class SaborService {
    private apiUrl = 'http://localhost:3000/sabores';

    constructor(private http: HttpClient) { }

    obtenerSabores(): Observable<Sabor[]> {
        return this.http.get<Sabor[]>(this.apiUrl);
    }
}