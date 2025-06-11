import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import {AuthStoreService} from '../../stores/auth.store.service';
import {AuthService} from '../auth.service';

export const authInterceptorService: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authStoreService = inject(AuthStoreService);
  const authService: AuthService = inject(AuthService);

  const token = authStoreService.accessToken();

  // Клонируем запрос и добавляем заголовок, если токен есть
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Если сервер вернул 401 (Unauthorized), возможно токен истек
      if (error.status === 401) {
        authService.logout(); // Разлогиниваем пользователя
      }
      return throwError(() => error);
    })
  );
};
