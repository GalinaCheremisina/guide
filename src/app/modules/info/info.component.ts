import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { infoRoutes } from './shared/consts/info.routes-const';
import { MenuItem } from '../../shared/interfaces/menu.interface';
import { InfoItemComponent } from '../../shared/components/info-item/info-item.component';

@Component({
    selector: 'info-root',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [InfoItemComponent, TranslateModule],
    templateUrl: './info.component.html',
    styleUrl: './info.component.scss'
})
export class InfoComponent {
  infoItems: MenuItem[] = infoRoutes.slice().filter(i => i.id !== 'base');
}
