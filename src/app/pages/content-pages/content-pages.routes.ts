import {Routes} from "@angular/router";
import {TestPageComponent} from "./test-page/test-page.component";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {LoginPageComponent} from "./login-page/login-page.component";

export const CONTENT_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'test',
        component: TestPageComponent,
        title: 'Test page'
      },
      {
        path: 'error',
        component: ErrorPageComponent,
        title: 'Error Page'
      },
      {
        path: 'login',
        component: LoginPageComponent,
        title: 'Login page'
      },
    ]
  }
]
