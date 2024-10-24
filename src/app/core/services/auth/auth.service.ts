import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  signIn(body: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, body).pipe(
      tap((response: any) => {
        this.setTokens(response.accessToken, response.refreshToken);
      })
    );
  }

  setTokens(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  getAccessToken(): string | null {
    return this.accessToken || localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return this.refreshToken || localStorage.getItem('refreshToken');
  }

  refreshAccessToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    return this.http.post(`${this.apiUrl}/refresh`, { refreshToken: refreshToken }).pipe(
      tap((response: any) => {
        this.setTokens(response.accessToken, response.refreshToken);
      })
    );
  }
}