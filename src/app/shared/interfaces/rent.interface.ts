export type Month =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export const monthList: Record<number, {name: string; first: Date; last: Date}> = {
  0: {name: 'January', first: new Date('2025-01-01'), last: new Date('2025-01-31')},
  1: {name: 'February', first: new Date('2025-02-01'), last: new Date('2025-02-28')},
  2: {name: 'March', first: new Date('2025-03-01'), last: new Date('2025-03-31')},
  3: {name: 'April', first: new Date('2025-04-01'), last: new Date('2025-04-30')},
  4: {name: 'May', first: new Date('2025-05-01'), last: new Date('2025-05-31')},
  5: {name: 'June', first: new Date('2025-06-01'), last: new Date('2025-06-30')},
  6: {name: 'July', first: new Date('2025-07-01'), last: new Date('2025-07-31')},
  7: {name: 'August', first: new Date('2025-08-01'), last: new Date('2025-08-31')},
  8: {name: 'September', first: new Date('2025-09-01'), last: new Date('2025-09-30')},
  9: {name: 'October', first: new Date('2025-10-01'), last: new Date('2025-10-31')},
  10: {name: 'November', first: new Date('2025-11-01'), last: new Date('2025-11-30')},
  11: {name: 'December', first: new Date('2025-12-01'), last: new Date('2025-12-31')},
}

export type HomeLocation = 'Ovacik' | 'Hisaronu' | 'Fethiye';

export type HomeOffers =
  | 'pool'
  | 'tv'
  | 'kitchen'
  | 'wifi'
  | 'parking'
  | 'washer'
  | 'airConditioning'
  | 'hairDryer'
  | 'iron'
  | 'pet';

export interface VillaItem {
  id: string;
  title: string;
  desc: {[key: string]: string};
  owner: string;
  ownerPhone: number;
  location: HomeLocation;
  prices: {[key: string]: number};
  image: string;
  images: string[];
  guests: number;
  bedrooms: number;
  bathrooms: number;
  offers: HomeOffers[];
  reviews: string[];
}

export interface RentFilter {
  location?: HomeLocation;
  month?: Month;
}

export interface RentAvailablePrice {
  month: Month;
  price: number;
}

export enum OfferIcon {
  'pool' = 'pool',
  'tv' = 'desktop_windows',
  'kitchen' = 'countertops',
  'wifi' = 'wifi',
  'parking' = 'directions_car',
  'washer' = 'local_laundry_service',
  'airConditioning' = 'ac_unit',
  'hairDryer' = 'air',
  'iron' = 'iron',
  'pet' = 'pets',
}
