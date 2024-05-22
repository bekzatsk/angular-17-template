import {Routes} from "@angular/router";
import {TestPageComponent} from "./test-page/test-page.component";
import {ButtonsComponent} from "./components/buttons/buttons.component";

export const FULL_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'test',
        component: TestPageComponent,
        title: 'Test page'
      },
      {
        path: 'buttons',
        component: ButtonsComponent,
        title: 'Test page'
      },
    ]
  }
]
