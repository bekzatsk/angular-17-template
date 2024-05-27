import { ApplicationConfig } from '@angular/core';
import {PreloadAllModules, provideRouter, withDebugTracing, withPreloading} from '@angular/router';

import { routes } from './app.routes';
import {HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi} from "@angular/common/http";
import {AuthService} from "./shared/auth/auth.service";
import {WINDOW_PROVIDERS} from "./shared/services/window.service";
import {AuthInterceptor} from "./shared/auth/auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    AuthService,
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withDebugTracing()
    ),
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi(),
    ),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    WINDOW_PROVIDERS
  ]
};
