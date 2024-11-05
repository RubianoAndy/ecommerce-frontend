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
    this.loadingService.show();
    return this.http.post(`${this.apiUrl}/sign-in`, body).pipe(
      tap((response: any) => {
        this.saveTokens(response.accessToken, response.refreshToken);
        this.router.navigate(['/']);
      }),
      finalize(() => {
        this.loadingService.hide(); // Ocultar loading después de la petición
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

  setAccessToken(accessToken: string,) {
    localStorage.setItem('accessToken', accessToken);
  }

  getAccessToken() {
    return localStorage.getItem('accessToken') || '';
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken') || '';
  }

  isAuthenticated(): boolean {
    const accessToken = this.getAccessToken();

    if (!accessToken || accessToken == '')
      return false;

    const payload = JSON.parse(atob(accessToken.split('.')[1]));
    const expired = payload.exp * 1000;   // Para dejarlo en milisegundos
    return Date.now() < expired;
  }
}