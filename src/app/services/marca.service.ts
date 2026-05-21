import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marca } from '../interfaces/lata.interface';

@Injectable({ providedIn: 'root' })
export class MarcaService {
    private apiUrl = 'http://localhost:3000/marcas';

    constructor(private http: HttpClient) { }

    obtenerMarcas(): Observable<Marca[]> {
        return this.http.get<Marca[]>(this.apiUrl);
    }
}