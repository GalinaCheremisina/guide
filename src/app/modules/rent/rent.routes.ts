import { Routes } from '@angular/router';

import { rentPaths } from './shared/const/rent.routes-const';
import { RentComponent } from './rent.component';
import { HomesComponent } from './pages/homes/homes.component';
import { HomeItemPageComponent } from './pages/home-item-page/home-item-page.component';
import { CarsComponent } from './pages/cars/cars.component';
import { TransferComponent } from './pages/transfer/transfer.component';
import { HomeItemsListComponent } from './shared/components/home-items-list/home-items-list.component';
import { AddHouseComponent } from './pages/add-house/add-house.component';

export const RENT_ROUTES: Routes = [
  { path: '', component: RentComponent, pathMatch: 'full' },
  {
    path: rentPaths.villas,
    component: HomesComponent,
    data: { type: 'villa' },
    children: [
      { path: '', component: HomeItemsListComponent },
      { path: ':id', component: HomeItemPageComponent, data: { type: 'villa' } },
    ]
  },
  {
    path: rentPaths.apartments,
    component: HomesComponent,
    data: { type: 'apartment' },
    children: [
      { path: '', component: HomeItemsListComponent },
      { path: ':id', component: HomeItemPageComponent, data: { type: 'apartment' } },
    ]
  },
  { path: rentPaths.cars, component: CarsComponent },
  { path: rentPaths.transfer, component: TransferComponent },
  { path: rentPaths.house, component: AddHouseComponent },
  { path: '**', redirectTo: '404' },
];
