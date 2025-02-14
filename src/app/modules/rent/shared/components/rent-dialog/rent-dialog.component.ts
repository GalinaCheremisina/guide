import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { DateRange } from '@angular/material/datepicker';

import { VillaItem } from '../../../../../shared/interfaces/rent.interface';
import { RentService } from '../../services/rent.service';

@Component({
    selector: 'app-rent-dialog',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        ReactiveFormsModule,
        TranslateModule,
    ],
    templateUrl: './rent-dialog.component.html',
    styleUrl: './rent-dialog.component.scss'
})
export class RentDialogComponent {
  readonly dialogRef = inject(MatDialogRef<RentDialogComponent>);
  readonly data = inject<{
    item: VillaItem;
    dates: DateRange<Date> | null;
    nigthsCount: number;
    price: string;
    lang: boolean;
  }>(MAT_DIALOG_DATA);
  title: string = this.data.item.title;
  img: string = this.data.item.image;
  months = this.rentService.getAvailableMonths(this.data.item);
  form: UntypedFormGroup = this.fb.group({
    phone: [null, Validators.required],
    month: null,
    name: null,
    guests: null,
    type: 'Telegram',
  });
  sended$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private fb: UntypedFormBuilder,
    private rentService: RentService
  ) {}

  close = () => this.dialogRef.close();

  noValid = (phone: string) =>
    !phone || (!!phone && (phone + '').length < 5);

  sendMessage = () => {
    const result = this.form.getRawValue();
    const text = `Rent\n
      ${this.title}\n
      <b>Owner -</b> ${this.data.item.ownerPhone}\n
      <b>Phone -</b> ${result.phone}\n
      <b>Name -</b> ${result.name}\n
      <b>Guests -</b> ${result.guests}\n
      <b>Dates -</b> ${this.data.dates?.start} - ${this.data.dates?.end}\n
      <b>Nights -</b> ${this.data.nigthsCount} nights\n
      <b>Price -</b> ${this.data.price}\n
      <b>Lang -</b> ${this.data.lang}\n
      Text to ${result.type}`;
    this.rentService.rentHouse(text).subscribe((_) => this.sended$.next(true));
  };
}
