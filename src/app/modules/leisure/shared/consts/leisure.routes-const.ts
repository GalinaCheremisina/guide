import { MenuItem } from '../../../../shared/interfaces/menu.interface';

export const leisurePaths = {
  base: 'leisure',
  paragliding: 'paragliding',
  boats: 'boats',
  jeep: 'jeep',
  rafting: 'rafting',
  scuba: 'scuba',
  fethiye: 'fethiye',
};

export const leisureRoutes: readonly MenuItem[] = [
  {
    id: 'base',
    link: `/${leisurePaths.base}`,
    image: '',
    title: 'leisure',
  },
  {
    id: 'paragliding',
    link: `/${leisurePaths.base}/${leisurePaths.paragliding}`,
    image: '9070213445.jpg',
    title: 'paragliding',
  },
  {
    id: 'boats',
    link: `/${leisurePaths.base}/${leisurePaths.boats}`,
    image: '63555.jpg',
    title: 'boats',
  },
  {
    id: 'scuba',
    link: `/${leisurePaths.base}/${leisurePaths.scuba}`,
    image: '40718132822.jpg',
    title: 'scuba',
  },
  {
    id: 'jeep',
    link: `/${leisurePaths.base}/${leisurePaths.jeep}`,
    image: '17182657.jpg',
    title: 'jeep',
  },
  {
    id: 'rafting',
    link: `/${leisurePaths.base}/${leisurePaths.rafting}`,
    image: '24928.jpg',
    title: 'rafting',
  },
  {
    id: 'fethiye',
    link: `/${leisurePaths.base}/${leisurePaths.fethiye}`,
    image: '134348.jpg',
    title: 'fethiye',
  },
];
