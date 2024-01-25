import {Routes} from "@angular/router";

export const CONTENT_LAYOUT_ROUTES: Routes = [
  {
    path: 'contents',
    loadChildren: () => import('../../pages/content-pages/content-pages.routes').then(m => m.CONTENT_ROUTES)
  }
];
