import {HttpClient} from '@angular/common/http';
import {TokenResponse} from '../models/user.model';
import {catchError, Observable, of, tap} from 'rxjs';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {AuthStoreService} from '../stores/auth.store.service';
import {inject, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);
  private authStore: AuthStoreService = inject(AuthStoreService);


  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<TokenResponse>(`${environment.apiUrl}/auth/login`, credentials).pipe(
      tap((response) => {
        this.authStore.onLogin(response);

        this.router.navigate(['/products']);
      }),
      catchError(error => {
        console.error('Login failed:', error);
        return of(null);
      })
    );
  }

  logout(): void {
    this.authStore.onLogout()
    this.router.navigate(['/login']);
  }
}
