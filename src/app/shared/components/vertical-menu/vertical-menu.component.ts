import {AfterViewInit, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ConfigService} from "../../services/config.service";
import {Subscription} from "rxjs";
import {ITemplateConfig} from "../../interfaces/template-config.metada";
import {CommonModule} from "@angular/common";
import {ROUTES} from "./vertical-menu-routes.config";
import {RouteInfo} from "./vertical-menu.metada";
import {RouterLink} from "@angular/router";
import {NgScrollbarModule} from "ngx-scrollbar";
import {LayoutService} from "../../services/layout.service";
import {IconsModule} from "../../modules/icons.module";


@Component({
  selector: 'app-vertical-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgScrollbarModule,
    IconsModule
  ],
  templateUrl: './vertical-menu.component.html',
  styleUrl: './vertical-menu.component.scss'
})
export class VerticalMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  private _configSub!: Subscription;
  private _layoutSub!: Subscription;
  public config!: ITemplateConfig;
  collapseSidebar = false;
  bgImage: string = '';
  public menuItems: RouteInfo[] = [];
  protected innerWidth: any;
  logoUrl = 'assets/img/logo.png';
  resizeTimeout: any;

  constructor(
    private configService: ConfigService,
    private layoutService: LayoutService,
    private cdr: ChangeDetectorRef,
  ) {

  }

  ngOnInit() {
    this.menuItems = ROUTES;
    this.menuItems.forEach(item => {
      item.opened = false;
    })
  }

  ngAfterViewInit() {
    this._configSub = this.configService.templateConf$.subscribe((templateConf) => {
      if (templateConf) {
        this.config = templateConf;
        this.bgImage = this.config.layout.sidebar.backgroundImageURL;
        this.collapseSidebar = this.config.layout.menuPosition === "Side" && this.config.layout.sidebar.collapsed;
      }
      //load layout
      this.loadLayout();
      this.cdr.detectChanges();
    });

    this._layoutSub = this.layoutService.overlaySidebarToggle$.subscribe(
      collapse => {
        if (this.config.layout.menuPosition === "Side") {
          this.collapseSidebar = collapse;
        }
      });
  }

  ngOnDestroy() {
    if (this._configSub) {
      this._configSub.unsubscribe();
    }
    if (this._layoutSub) {
      this._layoutSub.unsubscribe();
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any) {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout((() => {
      this.innerWidth = event.target.innerWidth;
      this.loadLayout();
    }).bind(this), 500);
  }

  openSubMenu(item: RouteInfo) {
    this.menuItems.forEach(it => {
      if (it != item) {
        it.opened = false;
      }
    })
    if (item.submenu.length) {
      item.opened = !item.opened;
    }
  }

  toggleSidebar() {
    let conf = this.config;
    conf.layout.sidebar.collapsed = !this.config.layout.sidebar.collapsed;
    this.configService.applyTemplateConfigChange({ layout: conf.layout });

    // setTimeout(() => {
    //   this.fireRefreshEventOnWindow();
    // }, 300);
  }

  loadLayout() {
    if (this.config.layout.sidebar.backgroundColor === 'white') {
      // this.logoUrl = 'assets/img/logo-dark.png';
    } else {
      // this.logoUrl = 'assets/img/logo.png';
    }

    this.collapseSidebar = this.config.layout.sidebar.collapsed;
  }


}
