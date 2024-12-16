import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { delay, finalize, Observable } from 'rxjs';
import { LoadingService } from '../../../shared/services/loading/loading.service';

interface FileData {
  message: string,
  filename: string
}

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

  edit(body: any): Observable<any> {
    this.loadingService.show();

    return this.http.put(`${this.apiUrl}/profile`, body).pipe(
      finalize(() => {
        this.loadingService.hide(); // Ocultar loading después de la petición
      })
    );
  }

  uploadAvatar(body: any): Observable<FileData> {
    this.loadingService.show();
    const time = 2 * 1000;  // Simula 2 segundos de delay
    
    return this.http.post<FileData>(`${this.apiUrl}/upload-avatar`, body).pipe(
      delay(time),
      finalize(() => {
        this.loadingService.hide(); // Ocultar loading después de la petición
      })
    );
  }
}