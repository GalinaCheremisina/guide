import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { placesRoutes } from './shared/consts/places.routes-const';
import { InfoItemComponent } from '../../shared/components/info-item/info-item.component';
import { MenuItem } from '../../shared/interfaces/menu.interface';

@Component({
    selector: 'places-root',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [InfoItemComponent, TranslateModule],
    templateUrl: './places.component.html',
    styleUrl: './places.component.scss'
})
export class PlacesComponent {
  infoItems: MenuItem[] = placesRoutes.slice().filter(i => i.id !== 'base');
}
