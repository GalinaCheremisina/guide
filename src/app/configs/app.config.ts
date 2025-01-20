import {
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  MissingTranslationHandler,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { appRoutes } from '../app.routes';
import { LoggerService } from '../shared/services/logger.service';
import { CustomMissingTranslationHandler } from '../shared/services/missing-translation.handler';


export function translateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const mainConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          deps: [HttpClient],
          useFactory: translateHttpLoaderFactory,
        },
        missingTranslationHandler: {
          provide: MissingTranslationHandler,
          deps: [LoggerService],
          useClass: CustomMissingTranslationHandler,
        },
      })
    ),
  ],
};
