import {computed, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {TokenResponse} from '../models/user.model';

export const refreshTokenKey = 'refreshToken';

@Injectable({
  providedIn: 'root',
})

export class AuthStoreService {
  private activeTokens: WritableSignal<TokenResponse | undefined> = signal(undefined);

  public accessToken: Signal<string | undefined> = computed(() => this.activeTokens()?.access_token);
  isAuthenticated:Signal<boolean> = computed(() => !!this.activeTokens())

  onLogin(token: TokenResponse) {
    this.activeTokens.set(token);
    localStorage.setItem(refreshTokenKey, token.refresh_token);
  }

  onLogout() {
    this.activeTokens.set(undefined);
    localStorage.removeItem(refreshTokenKey);
  }


}
