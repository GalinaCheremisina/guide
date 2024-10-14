import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

import { LoggerService } from './logger.service';

export class CustomMissingTranslationHandler implements MissingTranslationHandler {
  constructor(private logger: LoggerService) {}

  handle(params: MissingTranslationHandlerParams) {
    if (this.logger.showLogs) {
      this.logger.warn(`Missing translation: ${params.key}`);
    }
    return params.key;
  }
}
