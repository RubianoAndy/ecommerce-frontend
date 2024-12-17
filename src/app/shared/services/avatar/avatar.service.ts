import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, finalize, Observable } from 'rxjs';
import { LoadingService } from '../loading/loading.service';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) { }

  uploadAvatar(body: any): Observable<any> {
    this.loadingService.show();
    const time = 2 * 1000;  // Simula 2 segundos de delay
    
    return this.http.post(`${this.apiUrl}/avatar`, body).pipe(
      delay(time),
      finalize(() => {
        this.loadingService.hide(); // Ocultar loading después de la petición
      })
    );
  }

  getAvatar(): Observable<Blob> {
    this.loadingService.show();
    return this.http.get(`${this.apiUrl}/avatar`, { responseType: 'blob' }).pipe(
      finalize(() => {
        this.loadingService.hide(); // Ocultar loading después de la petición
      })
    );
  }
}
