import { Component } from '@angular/core';
import {IconsModule} from "../../../../shared/modules/icons.module";

@Component({
  selector: 'app-buttons',
  standalone: true,
  templateUrl: './buttons.component.html',
  imports: [
    IconsModule
  ],
  styleUrls: ['./buttons.component.scss']
})

export class ButtonsComponent {

}
