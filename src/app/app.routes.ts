import { Routes } from '@angular/router';
import {ContentLayoutComponent} from "./layouts/content-layout/content-layout.component";
import {FullLayoutComponent} from "./layouts/full-layout/full-layout.component";
import {FULL_LAYOUT_ROUTES} from "./shared/routes/full-layout.routes";
import {CONTENT_LAYOUT_ROUTES} from "./shared/routes/content-layout.routes";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/contents/test',
    pathMatch: 'full'
  },
  {
    path: '',
    component: FullLayoutComponent,
    children: FULL_LAYOUT_ROUTES
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: CONTENT_LAYOUT_ROUTES
  },
  {
    path: '**',
    redirectTo: '/contents/error'
  }
];
