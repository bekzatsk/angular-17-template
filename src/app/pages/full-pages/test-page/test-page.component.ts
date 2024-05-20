import { Component } from '@angular/core';
import {FeatherModule} from "angular-feather";


@Component({
  selector: 'app-full-test-page',
  standalone: true,
  imports: [
    FeatherModule
  ],
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.scss'
})
export class TestPageComponent {

  constructor() {
  }

}
