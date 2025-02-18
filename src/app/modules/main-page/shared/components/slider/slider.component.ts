import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe, NgClass, NgOptimizedImage } from '@angular/common';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MainPageService } from '../../../../../shared/services/main-page.service';

@Component({
    selector: 'app-slider',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      AsyncPipe,
      NgClass,
      NgOptimizedImage,
      MatButtonModule,
      MatIconModule,
    ],
    templateUrl: './slider.component.html',
    styleUrl: './slider.component.scss'
})
export class SliderComponent {
  images$: Observable<string[]> = this.mainPageService.getSliders();
  currentImgIndex$: BehaviorSubject<number> = new BehaviorSubject(0);
  mainImageSrc$: Observable<string>  = combineLatest([
    this.images$,
    this.currentImgIndex$
  ]).pipe(
    map(([images, ind]) =>
      ind < images.length ? images[ind] : images[ind % images.length]
    ),
  );

  constructor(private mainPageService: MainPageService) {}

  changeImgIndex = (currentIndex: number, type: 'inc' | 'dec' = 'inc') =>
    this.currentImgIndex$.next(
      type === 'inc' ? currentIndex + 1 : currentIndex - 1
    );
}
