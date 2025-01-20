import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';

import {
  HomeLocation,
  Month,
  RentFilter,
} from '../../../../../shared/interfaces/rent.interface';
import { locations } from '../../const/rent.consts';
import { RentService } from '../../services/rent.service';

@Component({
    selector: 'app-filter-rent',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterLink,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        FormsModule,
        CommonModule,
        TranslateModule,
    ],
    templateUrl: './filter.component.html',
    styleUrl: './filter.component.scss'
})
export class FilterRentComponent {
  @Input() type: 'villa' | 'appart' | 'transfer' = 'villa';
  @Input() filter: RentFilter | null = {};
  @Output() monthSelected: EventEmitter<Month> = new EventEmitter<Month>();
  @Output() locationSelected: EventEmitter<HomeLocation> =
    new EventEmitter<HomeLocation>();
  @Output() clearFilter: EventEmitter<void> = new EventEmitter();

  months = this.rentService.getNextMonths();
  locations = locations;

  constructor(private rentService: RentService) {}
}
