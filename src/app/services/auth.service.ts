import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    access_token: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly apiUrl = 'https://backendlatas-production.up.railway.app/auth';

    private http = inject(HttpClient);

    private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

    get isLoggedIn$(): Observable<boolean> {
        return this.loggedIn.asObservable();
    }

    login(credentials: LoginCredentials): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
            tap(response => {
                if (response && response.access_token) {
                    localStorage.setItem('auth_token', response.access_token);
                    this.loggedIn.next(true);
                }
            })
        );
    }

    logout(): void {
        localStorage.removeItem('auth_token');
        this.loggedIn.next(false);
    }

    getToken(): string | null {
        return localStorage.getItem('auth_token');
    }

    private hasToken(): boolean {
        return !!localStorage.getItem('auth_token');
    }
}