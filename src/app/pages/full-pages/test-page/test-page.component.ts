import { Component } from '@angular/core';
import {IconsModule} from "../../../shared/modules/icons.module";


@Component({
  selector: 'app-full-test-page',
  standalone: true,
  imports: [
    IconsModule
  ],
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.scss'
})
export class TestPageComponent {

  constructor() {
  }

}
