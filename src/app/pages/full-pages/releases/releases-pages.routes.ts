import {Routes} from "@angular/router";
import {ReleasesPageComponent} from "./releases-page/releases-page.component";
import {ReleasePageComponent} from "./release-page/release-page.component";

export const RELEASES_ROUTES: Routes = [
  {
    path: 'catalog',
    component: ReleasesPageComponent,
    title: 'Catalog',
  },
  {
    path: 'release',
    component: ReleasePageComponent,
    title: 'New Release',
  }
]
