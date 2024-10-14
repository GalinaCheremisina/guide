import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private localStorage = this.document.defaultView?.localStorage;
  private currentLanguage$: BehaviorSubject<string> = new BehaviorSubject(
    environment.defaultLang
  );

  constructor(
    private translate: TranslateService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.setLanguage();
  }

  public getLanguage = () => this.currentLanguage$.asObservable();

  public setLanguage = (lang: string = environment.defaultLang) => {
    this.localStorage?.setItem('currentLanguage', lang);
    this.translate.use(lang);
    this.currentLanguage$.next(lang);
  };

  public getLanguagesList = () => environment.i18n;
}
