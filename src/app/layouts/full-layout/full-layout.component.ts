import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {VerticalMenuComponent} from "../../shared/components/vertical-menu/vertical-menu.component";
import {CommonModule} from "@angular/common";
import {Subscription} from "rxjs";
import {ITemplateConfig} from "../../shared/interfaces/template-config.metada";
import {ConfigService} from "../../shared/services/config.service";
import {IconsModule} from "../../shared/modules/icons.module";
import {LayoutService} from "../../shared/services/layout.service";

@Component({
  selector: 'app-full-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    VerticalMenuComponent,
    IconsModule
  ],
  templateUrl: './full-layout.component.html',
  styleUrl: './full-layout.component.scss'
})
export class FullLayoutComponent implements OnInit, OnDestroy  {
  private _configSub!: Subscription;
  public config!: ITemplateConfig;
  isMenuCollapsedOnHover = false;

  constructor(
    private configService: ConfigService,
    private layoutService: LayoutService,
    private cdr: ChangeDetectorRef,
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
  }

}
