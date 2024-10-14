import { MenuItem } from '../../../../shared/interfaces/menu.interface';

export const rentPaths = {
  base: 'rent',
  villas: 'villas',
  apartments: 'apartments',
  cars: 'cars',
  transfer: 'transfer',
  house: 'add-house',
};

export const rentRoutes: readonly MenuItem[] = [
  {
    id: 'base',
    link: `/${rentPaths.base}`,
    image: '',
    title: 'rent',
  },
  {
    id: 'villas',
    link: `/${rentPaths.base}/${rentPaths.villas}`,
    image: '429607282.jpg',
    title: 'villas',
  },
  {
    id: 'apartments',
    link: `/${rentPaths.base}/${rentPaths.apartments}`,
    image: '402295548.jpg',
    title: 'apartments',
  },
  {
    id: 'cars',
    link: `/${rentPaths.base}/${rentPaths.cars}`,
    image: '20240.jpg',
    title: 'cars',
  },
  {
    id: 'transfer',
    link: `/${rentPaths.base}/${rentPaths.transfer}`,
    image: '2024061.jpg',
    title: 'transfer',
  },
  /*{
    id: 'add-house',
    link: `/${rentPaths.base}/${rentPaths.house}`,
    image: '2024061.jpg',
    title: 'house',
  },*/
];
