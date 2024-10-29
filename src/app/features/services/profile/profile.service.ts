import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = environment.apiUrl;

  private profileSubject = new BehaviorSubject<any>(null);
  public profile$ = this.profileSubject.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  getProfile() {
    this.http.get(`${this.apiUrl}/profile`).subscribe({
      next: (response) => {
        this.profileSubject.next(response);
      },
      error: (error) => {
        console.error('Error loading profile:', error);
        this.profileSubject.next(null);
      }
    });
  }

  getCurrentProfile() {
    return this.profileSubject.value;
  }
}
