import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-neighborhoods',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TranslateModule],
    templateUrl: './neighborhoods.component.html',
    styleUrl: './neighborhoods.component.scss'
})
export class NeighborhoodsComponent {}
