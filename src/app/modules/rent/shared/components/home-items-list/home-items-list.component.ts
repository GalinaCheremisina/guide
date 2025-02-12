import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, combineLatest, map, switchMap } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

import { HomeItemComponent } from '../home-item/home-item.component';
import { FilterRentComponent } from '../filter/filter.component';
import { HomeLocation, Month, RentFilter, VillaItem } from '../../../../../shared/interfaces/rent.interface';
import { RentService } from '../../services/rent.service';

@Component({
    selector: 'app-home-items-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        HomeItemComponent,
        FilterRentComponent,
        TranslateModule
    ],
    templateUrl: './home-items-list.component.html',
    styleUrl: './home-items-list.component.scss'
})
export class HomeItemsListComponent {
  filter$: BehaviorSubject<RentFilter> = new BehaviorSubject({});
  isVillaPage$: Observable<boolean> = this.route.data.pipe(
    map(data => data['type'] === 'villa')
  );
  private items$: Observable<VillaItem[]> = this.isVillaPage$.pipe(
    switchMap(isVillaPage => this.rentService.getHouses(isVillaPage))
  );
  filteredItems$: Observable<VillaItem[]> = combineLatest([
    this.filter$,
    this.items$,
  ]).pipe(
    map(([filter, items]) => {
      let result = [...items];
      if (!!filter?.location) {
        result = result.filter((i) => i.location === filter.location);
      }
      if (!!filter?.month) {
        result = result.filter((i) =>
          this.rentService.getAvailableMonths(i).includes(filter.month as Month)
        );
      }
      return result;
    })
  );

  constructor(
    private rentService: RentService,
    private route: ActivatedRoute
  ) {}

  changedMonth = (month: Month) =>
    this.filter$.next({ ...this.filter$.value, month: month });

  changedLocation = (loc: HomeLocation) =>
    this.filter$.next({ ...this.filter$.value, location: loc });

  clearFilter = () => this.filter$.next({});
}
