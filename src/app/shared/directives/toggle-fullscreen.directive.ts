import { Directive, HostListener } from '@angular/core';

import screenfull from 'screenfull';

@Directive({
  standalone: true,
  selector: '[appToggleFullscreen]'
})
export class ToggleFullscreenDirective {

  @HostListener('click') onClick() {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }
}
