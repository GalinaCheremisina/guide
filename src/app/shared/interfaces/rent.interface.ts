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
