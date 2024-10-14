import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import {
  ReactiveFormsModule,
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';

import { RentService } from '../../shared/services/rent.service';

@Component({
  selector: 'app-add-house',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './add-house.component.html',
  styleUrl: './add-house.component.scss',
})
export class AddHouseComponent {
  sended$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  months = this.rentService.getNextMonths();
  form: UntypedFormGroup= this.fb.group({
    nameOwner: [null, Validators.required],
    phoneOwner: [null, [Validators.required, Validators.minLength(12)]],
    type: 'Villa',
    nameHouse: [null, Validators.required],
    descHouse: null,
    prices: this.fb.array([]),
  });

  constructor(
    private fb: UntypedFormBuilder,
    private rentService: RentService
  ) {}

  getPricesControls = () =>
    (this.form.get('prices') as UntypedFormArray).controls;

  addPriceItem = () => {
    const items = this.form.get('prices') as UntypedFormArray;
    items.push(this.getGroup());
  };

  removePriceItem = (index: number) => {
    const items = this.form.get('prices') as UntypedFormArray;
    items.removeAt(index);
  };

  refreshForm = () => {
    this.sended$.next(false);
    (this.form.get('prices') as UntypedFormArray).controls = [];
    this.form.patchValue({
      type: 'Villa',
      nameHouse: null,
      descHouse: null,
    });
  };

  sendMessage = () => {
    const result = this.form.getRawValue();
    const months = result.prices
      .map(
        (item: { priceMonth: string; priceAmount: number }) =>
          `${item.priceMonth} - ${item.priceAmount}`
      )
      .join('\n');
    const text = `Аренда ${result.type}\n
      <b>Владелец -</b> ${result.nameOwner}\n
      <b>Телефон -</b> ${result.phoneOwner}\n
      <b>Название -</b> ${result.nameHouse}\n
      <b>Описание</b> - +${result.descHouse}\n
      <b>Цены по месяцам</b>: \n
      ${months}`;
    this.rentService.addHouse(text).subscribe((_) => this.sended$.next(true));
  };

  private getGroup = () => {
    return this.fb.group({
      priceMonth: [null, Validators.required],
      priceAmount: [null, Validators.required],
    });
  };
}
