import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

import { VillaItem } from '../../../../../shared/interfaces/rent.interface';
import { RentService } from '../../services/rent.service';

@Component({
    selector: 'app-home-item',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TranslateModule],
    templateUrl: './home-item.component.html',
    styleUrl: './home-item.component.scss'
})
export class HomeItemComponent {
  homeItem = input.required<VillaItem>();

  get startPrice() {
    return this.rentService.getLowerPrice(this.homeItem());
  }

  constructor(private router: Router, private rentService: RentService) {}

  showDetailsPage = () =>
    this.router.navigate([this.router.url, this.homeItem().id]);
}
