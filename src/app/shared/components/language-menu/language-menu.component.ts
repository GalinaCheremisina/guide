import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';

import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-language-menu',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    TranslateModule,
  ],
  templateUrl: './language-menu.component.html',
  styleUrl: './language-menu.component.scss',
})
export class LanguageMenuComponent {
  showMenu$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  list: string[] = this.languageService.getLanguagesList();
  currentLanguage$: Observable<string> = this.route.queryParams.pipe(
    tap(
      (params) =>
        !!params &&
        !!params['lang'] &&
        this.languageService.setLanguage(params['lang'])
    ),
    switchMap(() => this.languageService.getLanguage())
  );

  constructor(
    private languageService: LanguageService,
    private route: ActivatedRoute
  ) {}

  clickLanguageMenu = () => this.showMenu$.next(!this.showMenu$.value);

  changeLanguage = (lang: string) => {
    this.languageService.setLanguage(lang);
    this.clickLanguageMenu();
  };
}
