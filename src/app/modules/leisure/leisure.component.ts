import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { MenuItem } from '../../shared/interfaces/menu.interface';
import { leisureRoutes } from './shared/consts/leisure.routes-const';
import { InfoItemComponent } from '../../shared/components/info-item/info-item.component';

@Component({
    selector: 'leisure-root',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [InfoItemComponent, TranslateModule],
    templateUrl: './leisure.component.html',
    styleUrl: './leisure.component.scss'
})
export class LeisureComponent {
  items: MenuItem[] = leisureRoutes.slice().filter(i => i.id !== 'base');
}
