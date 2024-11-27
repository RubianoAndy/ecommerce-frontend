import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../../../shared/services/loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
  ) { }

  getProfile(): Observable<any> {
    this.loadingService.show();

    return this.http.get(`${this.apiUrl}/profile`).pipe(
      finalize(() => {
        this.loadingService.hide(); // Ocultar loading después de la petición
      })
    );
  }

  updateProfile(body: any): Observable<any> {
    this.loadingService.show();

    return this.http.put(`${this.apiUrl}/update-profile`, body).pipe(
      finalize(() => {
        this.loadingService.hide(); // Ocultar loading después de la petición
      })
    );
  }

  get(userId: any): Observable<any> {
    this.loadingService.show();

    return this.http.get(`${this.apiUrl}/profile/${userId}`).pipe(
      finalize(() => {
        this.loadingService.hide(); // Ocultar loading después de la petición
      })
    );
  }

  add(body: any): Observable<any> {
    this.loadingService.show();

    return this.http.post(`${this.apiUrl}/profile`, body).pipe(
      finalize(() => {
        this.loadingService.hide(); // Ocultar loading después de la petición
      })
    );
  }

  update(userId: any, body: any): Observable<any> {
    this.loadingService.show();

    return this.http.put(`${this.apiUrl}/update-profile/${userId}`, body).pipe(
      finalize(() => {
        this.loadingService.hide(); // Ocultar loading después de la petición
      })
    );
  }
}
