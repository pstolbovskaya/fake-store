import {computed, inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {TokenResponse} from '../models/user.model';
import {cartKey, LocalStorageService, refreshTokenKey} from './local-storage.service';

@Injectable({
  providedIn: 'root',
})

export class AuthStoreService {
  private activeTokens: WritableSignal<TokenResponse | undefined> = signal(undefined);
  private localStorageService = inject(LocalStorageService);
  public accessToken: Signal<string | undefined> = computed(() => this.activeTokens()?.access_token);
  isAuthenticated:Signal<boolean> = computed(() => !!this.activeTokens())

  onLogin(token: TokenResponse) {
    this.activeTokens.set(token);
    this.localStorageService.setItem(refreshTokenKey, token.refresh_token);
  }

  onLogout() {
    this.activeTokens.set(undefined);
    this.localStorageService.clear();
  }


}
