import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { MenuItem } from '../../interfaces/menu.interface';

@Component({
    selector: 'app-menu-item',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink, TranslateModule],
    templateUrl: './menu-item.component.html',
    styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent {
  menuItem = input.required<MenuItem>();
  menuItemType = input<'parent' | 'child'>('child');
  currentUrl = input<string>();
  hideMenuList = output<boolean>();

  isActiveMenu = (node: string) =>
    (this.currentUrl() === node || this.currentUrl()?.includes(`${node}/`)) &&
    this.menuItemType() === 'parent';
}
