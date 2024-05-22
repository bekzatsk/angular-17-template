import { ApplicationConfig } from '@angular/core';
import {PreloadAllModules, provideRouter, withDebugTracing, withPreloading} from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withFetch} from "@angular/common/http";
import {AuthService} from "./shared/auth/auth.service";
import {WINDOW_PROVIDERS} from "./shared/services/window.service";

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
    ),
    WINDOW_PROVIDERS
  ]
};
