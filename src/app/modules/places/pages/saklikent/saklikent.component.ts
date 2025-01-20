import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-saklikent',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TranslateModule],
    templateUrl: './saklikent.component.html',
    styleUrl: './saklikent.component.scss'
})
export class SaklikentComponent {}
