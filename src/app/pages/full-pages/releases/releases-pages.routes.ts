import {Routes} from "@angular/router";
import {ReleasesPageComponent} from "./releases-page/releases-page.component";

export const RELEASES_ROUTES: Routes = [
  {
    path: 'catalog',
    component: ReleasesPageComponent,
    title: 'Catalog',
  }
]
