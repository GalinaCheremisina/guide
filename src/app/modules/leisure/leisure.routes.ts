import { Routes } from '@angular/router';

import { leisurePaths } from './shared/consts/leisure.routes-const';
import { LeisureComponent } from './leisure.component';
import { ParaglidingComponent } from './pages/paragliding/paragliding.component';
import { BoatsComponent } from './pages/boats/boats.component';
import { JeepComponent } from './pages/jeep/jeep.component';
import { RaftingComponent } from './pages/rafting/rafting.component';
import { ScubaComponent } from './pages/scuba/scuba.component';
import { FethiyeComponent } from './pages/fethiye/fethiye.component';

export const LEISURE_ROUTES: Routes = [
  { path: '', component: LeisureComponent, pathMatch: 'full' },
  { path: `${leisurePaths.paragliding}`, component: ParaglidingComponent },
  { path: `${leisurePaths.boats}`, component: BoatsComponent },
  { path: `${leisurePaths.jeep}`, component: JeepComponent },
  { path: `${leisurePaths.rafting}`, component: RaftingComponent },
  { path: `${leisurePaths.scuba}`, component: ScubaComponent },
  { path: `${leisurePaths.fethiye}`, component: FethiyeComponent },
  { path: '**', redirectTo: '404' },
];
