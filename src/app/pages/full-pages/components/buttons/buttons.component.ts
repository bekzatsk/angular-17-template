import { Component } from '@angular/core';
import {FeatherModule} from "angular-feather";

@Component({
  selector: 'app-buttons',
  standalone: true,
  templateUrl: './buttons.component.html',
  imports: [
    FeatherModule
  ],
  styleUrls: ['./buttons.component.scss']
})

export class ButtonsComponent {

}
