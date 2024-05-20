import {Component, Inject, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-content-layout',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './content-layout.component.html',
  styleUrl: './content-layout.component.scss'
})
export class ContentLayoutComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.renderer.removeClass(this.document.body, "auth-page");
    // if (this.layoutSub) {
    //   this.layoutSub.unsubscribe();
    // }
  }

}
