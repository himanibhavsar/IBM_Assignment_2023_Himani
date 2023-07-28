import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  registerUser(user: any): Observable<any> {
    const url = 'https://mocki.io/v1/7f434df6-a4ac-4817-ab7c-dd39a564d01d';
    this.authService.registerUser();
    return this.http.get(url, user);
  }

  getUserProfile(): Observable<any> {
    const url = 'https://mocki.io/v1/611a3036-4420-48a5-b8da-9b461853cdd2';
    return this.http.get(url);
  }

  getUserFromLocalStorage(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
}
