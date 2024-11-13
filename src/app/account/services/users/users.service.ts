import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingService } from '../../../shared/services/loading/loading.service';
import { finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private loadingService: LoadingService,
  ) { }

  getUsers(page?: number, pageSize?: number, filters?: any[]): Observable<any> {
    this.loadingService.show();

    let params = new HttpParams();

    if (page !== undefined)
      params = params.set('page', page.toString());

    if (pageSize !== undefined)
      params = params.set('pageSize', pageSize.toString());

    if (filters && filters.length > 0)
      params = params.set('filters', JSON.stringify(filters));

    return this.http.get(`${this.apiUrl}/users`, { params }).pipe(
      finalize(() => {
        this.loadingService.hide();
      })
    );
  }

  changeStatus(body: any): Observable<any> {
    this.loadingService.show()

    return this.http.patch(`${this.apiUrl}/update-user-status`, body).pipe(
      finalize(() => {
        this.loadingService.hide();
      })
    );
  }

  delete(userId: any) {
    this.loadingService.show()

    return this.http.delete(`${this.apiUrl}/delete-user/${userId}`).pipe(
      finalize(() => {
        this.loadingService.hide();
      })
    );
  }
}