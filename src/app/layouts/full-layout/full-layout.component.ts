import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {VerticalMenuComponent} from "../../shared/components/vertical-menu/vertical-menu.component";
import {CommonModule, DOCUMENT} from "@angular/common";
import {Subscription} from "rxjs";
import {ITemplateConfig} from "../../shared/interfaces/template-config.metada";
import {ConfigService} from "../../shared/services/config.service";
import {IconsModule} from "../../shared/modules/icons.module";
import {LayoutService} from "../../shared/services/layout.service";
import {NavbarComponent} from "../../shared/components/navbar/navbar.component";

@Component({
  selector: 'app-full-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    VerticalMenuComponent,
    IconsModule,
    NavbarComponent
  ],
  templateUrl: './full-layout.component.html',
  styleUrl: './full-layout.component.scss'
})
export class FullLayoutComponent implements OnInit, AfterViewInit, OnDestroy  {
  private _configSub!: Subscription;
  public config!: ITemplateConfig;
  public innerWidth: any;
  isMenuCollapsedOnHover = false;
  overlayContent = false;
  displayOverlayMenu = false;
  hideSidebar = false;
  isSmallScreen = false;

  constructor(
    private configService: ConfigService,
    private layoutService: LayoutService,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
  ) {

  }

  ngOnInit() {
    this._configSub = this.configService.templateConf$.subscribe((templateConf) => {
      if (templateConf) {
        this.config = templateConf;
        this.sidebarMouseleave();
      }
      //load layout
      this.loadLayout();
      this.cdr.markForCheck();
    });
  }

  ngAfterViewInit() {
    this.setMenuLayout();
  }

  ngOnDestroy() {
    if (this._configSub) {
      this._configSub.unsubscribe();
    }
  }

  sidebarMouseenter() {
    if (this.config.layout.sidebar.collapsed) {
      this.isMenuCollapsedOnHover = false;
      this.layoutService.overlaySidebartoggle(this.isMenuCollapsedOnHover);
    }
  }

  sidebarMouseleave() {
    if (this.config.layout.sidebar.collapsed) {
      this.isMenuCollapsedOnHover = true;
      this.layoutService.overlaySidebartoggle(this.isMenuCollapsedOnHover);
    }
  }

  loadLayout() {
    if (this.config.layout.menuPosition === "Side") {
      this.isMenuCollapsedOnHover = this.config.layout.sidebar.collapsed;
      this.layoutService.overlaySidebartoggle(this.isMenuCollapsedOnHover);
      // this.toggleSidebar();
    }

    this.setMenuLayout();

    if (this.config.layout.menuPosition === "Side") {
      // vertical/Side menu expanded/collapse
      if (this.config.layout.sidebar.collapsed && !this.isSmallScreen) { // collapse side menu
        this.renderer.removeClass(this.document.body, "menu-expanded");
        this.renderer.addClass(this.document.body, "nav-collapsed");
      } else { // expand side menu
        this.renderer.removeClass(this.document.body, "nav-collapsed");
        this.renderer.addClass(this.document.body, "menu-expanded");
      }
    }

    //Navbar types
    if (this.config.layout.navbar.type === 'Static') {
      this.renderer.removeClass(this.document.body, "navbar-sticky");
      this.renderer.addClass(this.document.body, "navbar-static");
    }
    else if (this.config.layout.navbar.type === 'Fixed') {
      this.renderer.removeClass(this.document.body, "navbar-static");
      this.renderer.addClass(this.document.body, "navbar-sticky");
    }
  }

  setMenuLayout() {
    this.overlayContent = false;
    this.renderer.removeClass(this.document.body, "blank-page");
    if (this.config.layout.menuPosition === "Top") { // Horizontal Menu
      if (this.innerWidth < 1200) { // Screen size < 1200
        this.displayOverlayMenu = true;
        this.hideSidebar = true;
        this.renderer.removeClass(this.document.body, "horizontal-menu");
        this.renderer.removeClass(this.document.body, "menu-open");

        this.renderer.addClass(this.document.body, "horizontal-layout");
        this.renderer.addClass(this.document.body, "horizontal-menu-padding");
        this.renderer.addClass(this.document.body, "vertical-layout");
        this.renderer.addClass(this.document.body, "vertical-overlay-menu");
        this.renderer.addClass(this.document.body, "fixed-navbar");
        this.renderer.addClass(this.document.body, "menu-hide");
      } else { // Screen size > 1200
        this.displayOverlayMenu = false;
        this.hideSidebar = false;
        this.renderer.setAttribute(this.document.body, "data-menu", "horizontal-menu");
        this.renderer.removeClass(this.document.body, "vertical-layout");
        this.renderer.removeClass(this.document.body, "vertical-overlay-menu");
        this.renderer.removeClass(this.document.body, "fixed-navbar");
        this.renderer.removeClass(this.document.body, "menu-hide");
        this.renderer.removeClass(this.document.body, "vertical-menu");
        this.renderer.addClass(this.document.body, "horizontal-menu");
        this.renderer.addClass(this.document.body, "horizontal-layout");
        this.renderer.addClass(this.document.body, "horizontal-menu-padding");
      }
    } else if (this.config.layout.menuPosition === "Side") { // Vertical Menu
      if (this.innerWidth < 1200) { // If Screen size < 1200
        this.displayOverlayMenu = true;
        this.renderer.removeClass(this.document.body, "horizontal-layout");
        this.renderer.removeClass(this.document.body, "horizontal-menu");
        this.renderer.removeClass(this.document.body, "horizontal-menu-padding");
        this.renderer.removeClass(this.document.body, "menu-expanded");
        this.renderer.removeClass(this.document.body, "vertical-menu");
        this.renderer.removeClass(this.document.body, "menu-open");
        this.renderer.removeClass(this.document.body, "nav-collapsed");

        this.renderer.addClass(this.document.body, "vertical-layout");
        this.renderer.addClass(this.document.body, "menu-hide");

      } else { // If Screen size > 1200
        this.displayOverlayMenu = false;

        this.renderer.removeClass(this.document.body, "horizontal-layout");
        this.renderer.removeClass(this.document.body, "horizontal-menu");
        this.renderer.removeClass(this.document.body, "horizontal-menu-padding");

        this.renderer.setAttribute(this.document.body, "data-menu", "vertical-menu");
        this.renderer.addClass(this.document.body, "vertical-layout");
        if (!this.config.layout.sidebar.collapsed) {
          this.renderer.addClass(this.document.body, "menu-expanded");
          this.renderer.addClass(this.document.body, "menu-open");
        }
        this.renderer.addClass(this.document.body, "vertical-menu");
        this.renderer.removeClass(this.document.body, "menu-hide");
        this.renderer.removeClass(this.document.body, "vertical-overlay-menu");
      }
    }
  }

}
