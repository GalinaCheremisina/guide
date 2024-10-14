import { Routes } from '@angular/router';

import { placesPaths } from './shared/consts/places.routes-const';
import { PlacesComponent } from './places.component';
import { BeachComponent } from './pages/beach/beach.component';
import { LagoonComponent } from './pages/lagoon/lagoon.component';
import { ValleyComponent } from './pages/valley/valley.component';
import { KayakoyComponent } from './pages/kayakoy/kayakoy.component';
import { SaklikentComponent } from './pages/saklikent/saklikent.component';
import { TlosComponent } from './pages/tlos/tlos.component';
import { YakaparkComponent } from './pages/yakapark/yakapark.component';

export const PLACES_ROUTES: Routes = [
  { path: '', component: PlacesComponent, pathMatch: 'full' },
  { path: placesPaths.beach, component: BeachComponent },
  { path: placesPaths.lagoon, component: LagoonComponent },
  { path: placesPaths.valley, component: ValleyComponent },
  { path: placesPaths.kayakoy, component: KayakoyComponent },
  { path: placesPaths.saklikent, component: SaklikentComponent },
  { path: placesPaths.tlos, component: TlosComponent },
  { path: placesPaths.yakapark, component: YakaparkComponent },
  { path: '**', redirectTo: '404' },
];
