export interface MainPageData {
  sliders: string[];
  services: RentItem[];
  popular: PopularItem[];
}

export interface RentItem {
  name: string;
  desc: string;
  link: string;
  image: string;
}

export interface PopularItem {
  name: string;
  link: string;
  image: string;
}
