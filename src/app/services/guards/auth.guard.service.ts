import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import {AuthStoreService} from '../../stores/auth.store.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authStoreService = inject(AuthStoreService);
  const router = inject(Router);

  // Используем наш производный сигнал
  if (authStoreService.isAuthenticated()) {
    return true; // Доступ разрешен
  }

  // Если не аутентифицирован, перенаправляем на страницу входа
  return router.parseUrl('/login');
};
