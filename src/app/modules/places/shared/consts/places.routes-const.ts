import { MenuItem } from '../../../../shared/interfaces/menu.interface';

export const placesPaths = {
  base: 'places',
  beach: 'beach',
  lagoon: 'lagoon',
  valley: 'valley',
  kayakoy: 'kayakoy',
  saklikent: 'saklikent',
  tlos: 'tlos',
  yakapark: 'yakapark',
};

export const placesRoutes: readonly MenuItem[] = [
  {
    id: 'base',
    link: `/${placesPaths.base}`,
    image: '',
    title: 'places',
  },
  {
    id: 'beach',
    link: `/${placesPaths.base}/${placesPaths.beach}`,
    image: '24240n.jpg',
    title: 'beach',
  },
  {
    id: 'lagoon',
    link: `/${placesPaths.base}/${placesPaths.lagoon}`,
    image: '34323n.jpg',
    title: 'lagoon',
  },
  {
    id: 'valley',
    link: `/${placesPaths.base}/${placesPaths.valley}`,
    image: '16467121.jpg',
    title: 'valley',
  },
  {
    id: 'kayakoy',
    link: `/${placesPaths.base}/${placesPaths.kayakoy}`,
    image: '25702335.jpg',
    title: 'kayakoy',
  },
  {
    id: 'saklikent',
    link: `/${placesPaths.base}/${placesPaths.saklikent}`,
    image: '7132443.jpg',
    title: 'saklikent',
  },
  {
    id: 'tlos',
    link: `/${placesPaths.base}/${placesPaths.tlos}`,
    image: '17154439.jpg',
    title: 'tlos',
  },
  {
    id: 'yakapark',
    link: `/${placesPaths.base}/${placesPaths.yakapark}`,
    image: '717161457.jpg',
    title: 'yakapark',
  },
];
