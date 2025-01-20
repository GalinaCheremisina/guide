import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MenuItem } from '../../interfaces/menu.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-menu-item',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink, TranslateModule],
    templateUrl: './menu-item.component.html',
    styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent {
  @Input() menuItem: MenuItem | undefined;
  @Input() menuItemType: 'parent' | 'child' = 'child';
  @Input() currentUrl!: string;
  @Output() hideMenuList: EventEmitter<boolean> = new EventEmitter();

  isActiveMenu = (node: string) =>
    (this.currentUrl === node || this.currentUrl.includes(`${node}/`)) &&
    this.menuItemType === 'parent';
}
