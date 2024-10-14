import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { ApiService } from './api.service';
import { MainPageData, PopularItem, RentItem } from '../interfaces/main-page.interface';

@Injectable({
  providedIn: 'root',
})
export class MainPageService {
  constructor(private apiService: ApiService) {}

  public getSliders = () =>
    this.apiService
      .makeRequest(`/assets/data/main-page.json`, null, {
        method: 'GET',
      })
      .pipe(map((result: MainPageData) => result.sliders));

  public getRentItemsForMain = (): Observable<RentItem[]> =>
    this.apiService
      .makeRequest(`/assets/data/main-page.json`, null, {
        method: 'GET',
      })
      .pipe(map((result: MainPageData) => result.services));

  public getPopularArticles = (): Observable<PopularItem[]> =>
    this.apiService
      .makeRequest(`/assets/data/main-page.json`, null, {
        method: 'GET',
      })
      .pipe(map((result: MainPageData) => result.popular));
}
