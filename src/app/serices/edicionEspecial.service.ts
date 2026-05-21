import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EdicionEspecial } from '../interfaces/lata.interface';

@Injectable({ providedIn: 'root' })
export class EdicionEspecialService {
    private apiUrl = 'http://localhost:3000/ediciones-especiales';

    constructor(private http: HttpClient) { }

    obtenerEdicionesEspeciales(): Observable<EdicionEspecial[]> {
        return this.http.get<EdicionEspecial[]>(this.apiUrl);
    }
}