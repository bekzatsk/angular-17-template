import {Routes} from "@angular/router";
import {TestPageComponent} from "./test-page/test-page.component";

export const FULL_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'test',
        component: TestPageComponent,
        title: 'Test page'
      },
    ]
  }
]
