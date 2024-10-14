import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { SliderComponent } from './shared/components/slider/slider.component';
import { MainPageInfoComponent } from './shared/components/main-page-info/main-page-info.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SliderComponent, MainPageInfoComponent, TranslateModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {}
