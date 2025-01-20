import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-fethiye',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TranslateModule],
    templateUrl: './fethiye.component.html',
    styleUrl: './fethiye.component.scss'
})
export class FethiyeComponent {}
