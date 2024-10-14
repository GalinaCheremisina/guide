import { MenuItem } from '../../../../shared/interfaces/menu.interface';

export const infoPaths = {
  base: 'info',
  buses: 'buses',
  neighborhoods: 'neighborhoods',
  purchase: 'purchase',
};

export const infoRoutes: readonly MenuItem[] = [
  {
    id: 'base',
    link: `/${infoPaths.base}`,
    image: '',
    title: 'info',
  },
  {
    id: 'neighborhoods',
    link: `/${infoPaths.base}/${infoPaths.neighborhoods}`,
    image: '2332233.jpg',
    title: 'neighborhoods',
  },
  {
    id: 'buses',
    link: `/${infoPaths.base}/${infoPaths.buses}`,
    image: '4452332.jpg',
    title: 'buses',
  },
  {
    id: 'purchase',
    link: `/${infoPaths.base}/${infoPaths.purchase}`,
    image: '166635.jpg',
    title: 'purchase',
  },
];
