import {Routes} from "@angular/router";

export const FULL_LAYOUT_ROUTES: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('../../pages/full-pages/full-pages.routes').then(m => m.FULL_ROUTES)
  }
];
