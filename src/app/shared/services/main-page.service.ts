import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { ApiService } from '../consts/api.service';
import { MainPageData, PopularItem, RentItem } from '../interfaces/main-page.interface';
import { requestURL } from '../consts/app.const';

@Injectable({
  providedIn: 'root',
})
export class MainPageService {
  constructor(private apiService: ApiService) {}

  public getSliders = () =>
    this.apiService
      .makeRequest(requestURL.sliders, null, {
        method: 'GET',
      })
      .pipe(map((result: MainPageData) => result.sliders));

  public getRentItemsForMain = (): Observable<RentItem[]> =>
    this.apiService
      .makeRequest(requestURL.rentItems, null, {
        method: 'GET',
      })
      .pipe(map((result: MainPageData) => result.services));

  public getPopularArticles = (): Observable<PopularItem[]> =>
    this.apiService
      .makeRequest(requestURL.popularArticles, null, {
        method: 'GET',
      })
      .pipe(map((result: MainPageData) => result.popular));
}
