import { Injectable } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';

import { ApiService } from '../../../../shared/services/api.service';
import {
  Month,
  RentAvailablePrice,
  VillaItem,
} from '../../../../shared/interfaces/rent.interface';
import {
  addHouseChatidTelegram,
  addHouseTokenTelegram,
  rentChatidTelegram,
  rentTokenTelegram,
} from '../../../../shared/consts/app.const';
import { months } from '../const/rent.consts';

@Injectable({
  providedIn: 'root',
})
export class RentService {
  constructor(private api: ApiService) {}

  getHouses = (isVillas: boolean = false): Observable<VillaItem[]> => {
    const url = isVillas
      ? '/assets/data/villas.json'
      : '/assets/data/apartments.json';
    return this.api
      .makeRequest(url, null, {
        method: 'GET',
      })
      .pipe(
        map((result: { villas: VillaItem[] }) => result.villas),
        shareReplay(1)
      );
  };

  getHomeById = (id: string, isVillas: boolean = true) =>
    this.getHouses(isVillas).pipe(
      map((items) => items.find((i) => i.id === id))
    );

  rentHouse = (text: string) => {
    const chatid = rentChatidTelegram;
    const token = rentTokenTelegram;
    return this.api.makeRequestTelegram(text, chatid, token);
  };

  addHouse = (text: string) => {
    const chatid = addHouseChatidTelegram;
    const token = addHouseTokenTelegram;
    return this.api.makeRequestTelegram(text, chatid, token);
  };

  getNextMonths = (): Month[] => months.slice(new Date().getMonth());

  getAvailableMonths = (homeItem: VillaItem) =>
    this.getMonthsPrices(homeItem).map(
      (item: RentAvailablePrice) => item.month
    );

  getMonthsPrices = (homeItem: VillaItem | undefined): RentAvailablePrice[] => {
    if (!homeItem) {
      return [];
    }
    const months = this.getNextMonths();
    return Object.keys(homeItem.prices)
      .map(
        (i) => ({ month: i, price: homeItem.prices[i] } as RentAvailablePrice)
      )
      .filter((item: RentAvailablePrice) => months.includes(item.month));
  };

  getLowerPrice = (homeItem: VillaItem | undefined): number => {
    if (!homeItem) {
      return 0;
    }
    const prices = this.getMonthsPrices(homeItem).map((item) => item.price);
    return Math.min(...prices);
  }
}
