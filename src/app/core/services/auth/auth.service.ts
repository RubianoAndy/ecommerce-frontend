import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  signIn(body: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/sign-in`, body).pipe(
      // El tap se ejecuta depués de realizada la petición
      tap((response: any) => {
        this.setTokens(response.accessToken, response.refreshToken);
      })
    );
  }

  signOut(): Observable<any> {
    const body = {
      accessToken: this.getAccessToken(),
      refreshToken: this.getRefreshToken(),
    };

    return this.http.post(`${this.apiUrl}/sign-out`, body).pipe(
      // El tap se ejecuta depués de realizada la petición
      tap(() => {
        this.clearTokens();
        this.router.navigate(['/']);
      })
    );
  }

  refreshTokens(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.signOut();
      return throwError(() => 'No refresh token available');
    }

    return this.http.post(`${this.apiUrl}/refresh-token`, { refreshToken }).pipe(
      tap((response: any) => {
        this.setTokens(response.accessToken, response.refreshToken);
      })
    );
  }

  setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  clearTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  getAccessToken(): string | null {
    if (typeof(window) !== undefined)
      return localStorage.getItem('accessToken');
    else
      return null;
  }

  getRefreshToken(): string | null {
    if (typeof(window) !== undefined)
      return localStorage.getItem('refreshToken');
    else
      return null;
  }

  isAuthenticated(): boolean {
    const token = this.getAccessToken();

    if (!token)
      return false;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const expired = payload.exp * 1000;   // Para dejarlo en milisegundos
    return Date.now() < expired;
  }
}