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
}

export interface RentFilter {
  location?: HomeLocation;
  month?: Month;
}

export interface RentAvailablePrice {
  month: Month;
  price: number;
}
