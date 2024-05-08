import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgScrollbarModule} from "ngx-scrollbar";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgScrollbarModule, RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'angular17';
}
