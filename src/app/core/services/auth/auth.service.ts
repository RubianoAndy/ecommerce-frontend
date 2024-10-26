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
      access_token: this.getAccessToken(),
      refresh_token: this.getRefreshToken(),
    };

    return this.http.post<any>(`${this.apiUrl}/sign-out`, body).pipe(
      // El tap se ejecuta depués de realizada la petición
      tap(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        this.router.navigate(['sign-in']);
      })
    );
  }

  setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
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
}