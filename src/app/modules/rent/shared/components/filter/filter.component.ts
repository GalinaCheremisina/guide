import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  filter = input<RentFilter | null>({});
  monthSelected = output<Month>();
  locationSelected = output<HomeLocation>();
  clearFilter = output<void>();

  months = this.rentService.getNextMonths();
  locations = locations;

  constructor(private rentService: RentService) {}
}
