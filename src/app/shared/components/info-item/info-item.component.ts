import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { MenuItem } from '../../interfaces/menu.interface';

@Component({
  selector: 'app-info-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, TranslateModule],
  templateUrl: './info-item.component.html',
  styleUrl: './info-item.component.scss',
})
export class InfoItemComponent {
  @Input() item!: MenuItem;
}
