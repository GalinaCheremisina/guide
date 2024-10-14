import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BehaviorSubject,
  Observable,
  distinctUntilChanged,
  map,
  startWith,
  tap,
} from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

import { infoRoutes } from '../../../modules/info/shared/consts/info.routes-const';
import { placesRoutes } from '../../../modules/places/shared/consts/places.routes-const';
import { leisureRoutes } from '../../../modules/leisure/shared/consts/leisure.routes-const';
import { rentRoutes } from '../../../modules/rent/shared/const/rent.routes-const';
import { MenuItem } from '../../interfaces/menu.interface';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MenuItemComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  routes: Array<readonly MenuItem[]> = [
    infoRoutes,
    placesRoutes,
    rentRoutes,
    leisureRoutes,
  ];
  currentUrl$: Observable<string>;
  showMobileMenu$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private router: Router) {
    this.currentUrl$ = this.router.events.pipe(
      map((event) =>
        event instanceof NavigationEnd ? event.url : this.router.url
      ),
      distinctUntilChanged(),
      startWith(this.router.url),
      tap(() => {
        this.showMobileMenu$.next(false);
      })
    );
  }

  getParentMenuItem = (items: readonly MenuItem[]) =>
    items.find((i) => i.id === 'base');

  getChildrenMenuItems = (items: readonly MenuItem[]) =>
    items.slice().filter((i) => i.id !== 'base');

  clickMenu = () => this.showMobileMenu$.next(!this.showMobileMenu$.value);
}
