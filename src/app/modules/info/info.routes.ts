import { Routes } from '@angular/router';

import { infoPaths } from './shared/consts/info.routes-const';
import { InfoComponent } from './info.component';
import { BusesComponent } from './pages/buses/buses.component';
import { NeighborhoodsComponent } from './pages/neighborhoods/neighborhoods.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';

export const INFO_ROUTES: Routes = [
  { path: '', component: InfoComponent, pathMatch: 'full' },
  { path: infoPaths.buses, component: BusesComponent },
  { path: infoPaths.neighborhoods, component: NeighborhoodsComponent },
  { path: infoPaths.purchase, component: PurchaseComponent },
  { path: '**', redirectTo: '404' },
];
