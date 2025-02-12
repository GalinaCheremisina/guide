import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-yakapark',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TranslateModule],
    templateUrl: './yakapark.component.html',
    styleUrl: './yakapark.component.scss'
})
export class YakaparkComponent {}
