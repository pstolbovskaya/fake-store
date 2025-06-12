import {HttpClient} from '@angular/common/http';
import {TokenResponse} from '../models/user.model';
import {catchError, Observable, of, pipe, tap} from 'rxjs';
import {environment} from '../../environments/environment';
import {AuthStoreService, refreshTokenKey} from '../stores/auth.store.service';
import {inject, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private authStore: AuthStoreService = inject(AuthStoreService);

  private handleResponse(errorCallback?: () => void) {
    return pipe(
      tap((response: TokenResponse) => {
        this.authStore.onLogin(response);
        this.refreshAccessToken();
      }),
      catchError(error => {
        errorCallback?.();
        console.error('Login failed:', error);
        return of(null);
      })
    )
  }

  private refreshAccessToken() {
    console.log('Refresh access token');
    setTimeout(() => this.refreshToken().subscribe(), 15*60*1000);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<TokenResponse>(`${environment.apiUrl}/auth/login`, credentials).pipe(
      this.handleResponse()
    );
  }

  logout(): void {
    this.authStore.onLogout();
  }

  refreshToken() {
    const refreshToken = localStorage.getItem(refreshTokenKey);
    console.log('Refresh token');

    if (refreshToken) {
      console.log('Refresh token ifed');
      return this.http.post<TokenResponse>(`${environment.apiUrl}/auth/refresh-token`, {refreshToken})
        .pipe(this.handleResponse(()=> localStorage.removeItem(refreshTokenKey)));
    }
    return of(null);
  }
}
