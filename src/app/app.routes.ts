import { Routes } from '@angular/router';

import { MainPageComponent } from './modules/main-page/main-page.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'info',
    loadChildren: () => import('./modules/info/info.routes').then(mod => mod.INFO_ROUTES),
  },
  {
    path: 'leisure',
    loadChildren: () => import('./modules/leisure/leisure.routes').then(mod => mod.LEISURE_ROUTES),
  },
  {
    path: 'places',
    loadChildren: () => import('./modules/places/places.routes').then(mod => mod.PLACES_ROUTES),
  },
  {
    path: 'rent',
    loadChildren: () => import('./modules/rent/rent.routes').then(mod => mod.RENT_ROUTES),
  },
  //{ path: '404', component: Error404PageComponent },
  { path: '**', redirectTo: '404' },
];
