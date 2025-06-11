import {computed, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {TokenResponse} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})

export class AuthStoreService {
  private activeTokens: WritableSignal<TokenResponse | undefined> = signal(undefined);

  public accessToken: Signal<string | undefined> = computed(() => this.activeTokens()?.access_token);
  isAuthenticated:Signal<boolean> = computed(() => !!this.activeTokens())

  onLogin(token: TokenResponse) {
    this.activeTokens.set(token);
  }

  onLogout() {
    this.activeTokens.set(undefined);
  }


}
