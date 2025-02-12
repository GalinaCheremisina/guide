// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';

import { mainConfig } from './app/configs/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, mainConfig)
  .catch((err) => console.error(err));
