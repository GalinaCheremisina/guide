import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable, map } from 'rxjs';

import { LanguageService } from '../../services/language.service';

@Component({
    selector: 'app-footer',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink, CommonModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {
  telegramLink$: Observable<string> = this.languageService
    .getLanguage()
    .pipe(
      map((lang) =>
        lang === 'ru'
          ? 'https://t.me/oludeniz_guide_ru'
          : 'https://t.me/oludeniz_guide'
      )
    );

  constructor(private languageService: LanguageService) {}
}
