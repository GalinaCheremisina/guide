import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  map,
  shareReplay,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { TranslateModule } from '@ngx-translate/core';

import { RentService } from '../../shared/services/rent.service';
import { MenuLinkService } from '../../../../shared/services/menu-link.service';
import {
  RentAvailablePrice,
  VillaItem,
} from '../../../../shared/interfaces/rent.interface';
import { RentDialogComponent } from '../../shared/components/rent-dialog/rent-dialog.component';
import { LanguageService } from '../../../../shared/services/language.service';

@Component({
    selector: 'app-home-item-page',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        TranslateModule,
    ],
    templateUrl: './home-item-page.component.html',
    styleUrl: './home-item-page.component.scss'
})
export class HomeItemPageComponent {
  private isVillaPage$: Observable<boolean> = this.route.data.pipe(
    map((data) => data['type'] === 'villa')
  );
  home$ = this.route.params.pipe(
    map((params) => params['id']),
    withLatestFrom(this.isVillaPage$),
    switchMap(([homeId, isVillaPage]) =>
      this.rentService.getHomeById(homeId, isVillaPage)
    ),
    shareReplay(1)
  );
  selectedImgIndex$: BehaviorSubject<number> = new BehaviorSubject(0);
  selectedImg$: Observable<string> = this.selectedImgIndex$.pipe(
    withLatestFrom(this.home$),
    map(([index, item]) => {
      const images = item?.images;
      if (!!images && !!images.length) {
        const ind = index < images.length ? index : index % images.length;
        return images[ind];
      }
      return '';
    })
  );
  pricesList$: Observable<RentAvailablePrice[]> = this.home$.pipe(
    map((item) => this.rentService.getMonthsPrices(item)),
    map((prices) => prices.filter(p => !!p.price))
  );
  showPrices$ = this.pricesList$.pipe(
    map((list) => !!list.length)
  );
  desc$: Observable<string> = this.languageService.getLanguage().pipe(
    withLatestFrom(this.home$),
    map(([lang, item]) => item?.desc[lang] || '')
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rentService: RentService,
    private menuLinkService: MenuLinkService,
    private dialog: MatDialog,
    private languageService: LanguageService
  ) {}

  goToVillasPage = () => {
    const link = this.menuLinkService.getRentLinkById(
      `${this.route.snapshot.data['type']}s`
    );
    !!link && this.router.navigateByUrl(link);
  };

  changeImgIndex = (currentIndex: number, type: 'inc' | 'dec' = 'inc') =>
    this.selectedImgIndex$.next(
      type === 'inc' ? currentIndex + 1 : currentIndex - 1
    );

  openDialog = (item: VillaItem) => {
    this.dialog.open(RentDialogComponent, {
      data: { item },
      width: '450px',
      scrollStrategy: new NoopScrollStrategy(),
    });
  };
}
