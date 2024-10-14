import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { MenuItem } from '../../shared/interfaces/menu.interface';
import { rentRoutes } from './shared/const/rent.routes-const';
import { InfoItemComponent } from '../../shared/components/info-item/info-item.component';

@Component({
  selector: 'rent-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InfoItemComponent, TranslateModule],
  templateUrl: './rent.component.html',
  styleUrl: './rent.component.scss'
})
export class RentComponent {
  rentItems: MenuItem[] = rentRoutes.slice().filter(i => i.id !== 'base');
}
