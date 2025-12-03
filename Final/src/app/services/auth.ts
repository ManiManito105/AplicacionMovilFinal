import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = 'http://192.168.1.3:5000/api/auth/login';
  private isLoggedIn = false;

  constructor(private http: HttpClient) {
    const session = localStorage.getItem('session');
    this.isLoggedIn = !!session;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password }).pipe(
      tap((res) => {
        if (res.success) {
          localStorage.setItem('session', JSON.stringify(res.user));
          this.isLoggedIn = true;
        }
      })
    );
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('session');
  }

  get authenticated(): boolean {
    return this.isLoggedIn;
  }

  getUser() {
    const session = localStorage.getItem('session');
    return session ? JSON.parse(session) : null;
  }
}