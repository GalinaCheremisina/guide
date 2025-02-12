import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

import { placesRoutes } from '../../../../places/shared/consts/places.routes-const';
import { rentRoutes } from '../../../../rent/shared/const/rent.routes-const';
import { MainPageService } from '../../../../../shared/services/main-page.service';
import {
  PopularItem,
  RentItem,
} from '../../../../../shared/interfaces/main-page.interface';

@Component({
    selector: 'app-main-page-info',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgOptimizedImage, CommonModule, TranslateModule, RouterLink],
    templateUrl: './main-page-info.component.html',
    styleUrl: './main-page-info.component.scss'
})
export class MainPageInfoComponent {
  rentItems$: Observable<RentItem[]>;
  popularItems$: Observable<PopularItem[]>;
  placesPageLink: string =
    `${placesRoutes.find((i) => i.id === 'base')?.link}/` || '/';
  rentPageLink: string =
    `${rentRoutes.find((i) => i.id === 'base')?.link}/` || '/';

  constructor(private mainPageService: MainPageService) {
    this.rentItems$ = this.mainPageService.getRentItemsForMain();
    this.popularItems$ = this.mainPageService.getPopularArticles();
  }
}
