import { Injectable } from '@angular/core';

import { infoRoutes } from '../../modules/info/shared/consts/info.routes-const';
import { rentRoutes } from '../../modules/rent/shared/const/rent.routes-const';


@Injectable({
  providedIn: 'root',
})
export class MenuLinkService {
  getInfoLinkById = (id: string) => infoRoutes.find(i => i.id === id)?.link;
  getRentLinkById = (id: string) => rentRoutes.find(i => i.id === id)?.link;
}
