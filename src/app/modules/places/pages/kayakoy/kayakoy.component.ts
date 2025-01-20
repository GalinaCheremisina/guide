import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-kayakoy',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TranslateModule],
    templateUrl: './kayakoy.component.html',
    styleUrl: './kayakoy.component.scss'
})
export class KayakoyComponent {}
