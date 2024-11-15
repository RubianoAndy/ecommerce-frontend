import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../../../shared/services/loading/loading.service';
import { finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
  ) { }

  getAllRoles(): Observable<any> {
    this.loadingService.show();

    return this.http.get(`${this.apiUrl}/all-roles`).pipe(
      finalize(() => {
        this.loadingService.hide();
      })
    );
  }
}
