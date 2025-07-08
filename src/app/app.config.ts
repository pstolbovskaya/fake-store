import {
  ApplicationConfig, importProvidersFrom, inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HttpClient, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideTranslation() {
  return {
    defaultLanguage: 'en',
    loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
    },
  }
}
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    })),
    provideHttpClient(withInterceptorsFromDi()),
    provideAppInitializer(() => {
      const authService: AuthService = inject(AuthService);
      return authService.refreshToken();
    })
  ]
};
