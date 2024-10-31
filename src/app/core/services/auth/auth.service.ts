import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize, Observable, tap } from 'rxjs';
import { LoadingService } from '../../../shared/services/loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private loadingService: LoadingService,
  ) { }

  signIn(body: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/sign-in`, body).pipe(
      // El tap se ejecuta depués de realizada la petición
      tap((response: any) => {
        this.saveTokens(response.accessToken, response.refreshToken);
      })
    );
  }

  signOut(): Observable<any> {
    this.loadingService.show();
    const body = {
      accessToken: this.getAccessToken(),
      refreshToken: this.getRefreshToken(),
    };

    return this.http.post(`${this.apiUrl}/sign-out`, body).pipe(
      // El tap se ejecuta depués de realizada la petición
      tap(() => {
        this.deleteTokens();
        this.router.navigate(['/']);
      }),
      finalize(() => {
        this.loadingService.hide(); // Ocultar loading después de la petición
      })
    );
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();

    return this.http.post(`${this.apiUrl}/refresh-token`, { refreshToken });
  }

  saveTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  deleteTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  getAccessToken() {
    return localStorage.getItem('accessToken') || '';
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken') || '';
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