import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { MenuItem } from '../../interfaces/menu.interface';

@Component({
    selector: 'app-info-item',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink, TranslateModule],
    templateUrl: './info-item.component.html',
    styleUrl: './info-item.component.scss',
})
export class InfoItemComponent {
  item: InputSignal<MenuItem> = input.required();
}
