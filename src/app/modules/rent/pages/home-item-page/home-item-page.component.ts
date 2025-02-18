import { ChangeDetectionStrategy, Component, computed, model } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
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
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { TranslateModule } from '@ngx-translate/core';
import {
  DateRange,
  MatCalendar,
  MatDatepickerModule,
  DefaultMatCalendarRangeStrategy,
  MatRangeDateSelectionModel,
} from '@angular/material/datepicker';

import { RentService } from '../../shared/services/rent.service';
import { MenuLinkService } from '../../../../shared/services/menu-link.service';
import {
  VillaItem,
  OfferIcon,
  HomeOffers,
  monthList,
} from '../../../../shared/interfaces/rent.interface';
import { RentDialogComponent } from '../../shared/components/rent-dialog/rent-dialog.component';
import { LanguageService } from '../../../../shared/services/language.service';

@Component({
    selector: 'app-home-item-page',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      AsyncPipe,
      DatePipe,
      MatButtonModule,
      MatIconModule,
      MatDialogModule,
      MatCalendar,
      MatDatepickerModule,
      TranslateModule,
    ],
    providers: [
      DefaultMatCalendarRangeStrategy,
      MatRangeDateSelectionModel,
      provideNativeDateAdapter()
    ],
    templateUrl: './home-item-page.component.html',
    styleUrl: './home-item-page.component.scss'
})
export class HomeItemPageComponent {
  private isVillaPage$: Observable<boolean> = this.route.data.pipe(
    map((data) => data['type'] === 'villa')
  );
  home$: Observable<VillaItem | undefined> = this.route.params.pipe(
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
  desc$: Observable<string> = this.languageService.getLanguage().pipe(
    withLatestFrom(this.home$),
    map(([lang, item]) => item?.desc[lang] || '')
  );
  selectedDateRange = model<DateRange<Date> | null>(null);
  today = new Date();
  nigthsCount = computed(() => this.getCountDays(this.selectedDateRange()));

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rentService: RentService,
    private menuLinkService: MenuLinkService,
    private dialog: MatDialog,
    private languageService: LanguageService,
  ) {}

  getFinalPrice = (home: VillaItem) => {
    if (this.languageService.isRussianLang()) {
      const price = this.getPrice(home) * 100 + this.nigthsCount() * 500;
      return price.toString();
    } else {
      return `$${this.getPrice(home)}`;
    }
  }

  rangeChanged = (date: Date) => {
    const range = this.selectedDateRange();
    if (
      !!range &&
      range.start &&
      date > range.start &&
      !range.end
    ) {
      this.selectedDateRange.set(new DateRange(
        range.start,
        date
      ));
    } else {
      this.selectedDateRange.set(new DateRange(date, null));
    }
  }

  getOfferIcon = (type: HomeOffers) => OfferIcon[type];

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
      data: {
        item,
        dates: this.selectedDateRange(),
        nigthsCount: this.nigthsCount(),
        price: this.getFinalPrice(item),
        lang: this.languageService.isRussianLang()
      },
      width: '450px',
      scrollStrategy: new NoopScrollStrategy(),
    });
  };

  private getPrice = (home: VillaItem, range = this.selectedDateRange(), lastDay = false) => {
    const count = this.getCountDays(range);
    const inOneMonth = range!.start!.getMonth() == range!.end!.getMonth();

    const countPrice = () => {
      if (inOneMonth) {
        const dayPrice = this.getMonthPrice(home, monthList[range!.start!.getMonth()].name);
        return (lastDay ? count + 1 : count) * dayPrice;
      } else {
        const firstMonth = monthList[range!.start!.getMonth()];
        const lastMonth = monthList[range!.end!.getMonth()];
        const daysFirstMonth = Math.ceil(this.getCountDays(new DateRange(range!.start, firstMonth.last)));
        const price = daysFirstMonth * this.getMonthPrice(home, firstMonth.name) +
          (count - daysFirstMonth)*this.getMonthPrice(home, lastMonth.name);
        return price;
      }
    }

    if (this.nigthsCount() > 30 && !inOneMonth) {
      const months = Array.from(
        {length: range!.end!.getMonth() - range!.start!.getMonth() + 1},
        (_, i) => i + range!.start!.getMonth(),
      );
      const result: number = months.reduce((sum, item, i) => {
        const start = !i ? range!.start : monthList[item].first;
        const end = i == months.length - 1 ? range!.end : monthList[item].last;
        return sum + this.getPrice(home, new DateRange(start, end), i !== months.length - 1);
      }, 0);

      return result;
    }

    return !!range && range.start && range.end ? countPrice() : 0;
  }

  private getMonthPrice = (home: VillaItem, month: string) => home.prices[month];

  private getCountDays = (range: DateRange<Date> | null) => {
    if (!!range && range.start && range.end) {
      const time = range.end.getTime() - range.start.getTime();
      return time/86400000;
    } else {
      return 0;
    }
  }
}
