import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {VerticalMenuComponent} from "../../shared/components/vertical-menu/vertical-menu.component";
import {CommonModule} from "@angular/common";
import {Subscription} from "rxjs";
import {ITemplateConfig} from "../../shared/interfaces/template-config.metada";
import {ConfigService} from "../../shared/services/config.service";
import {IconsModule} from "../../shared/modules/icons.module";

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

  constructor(
    private configService: ConfigService,
    private cdr: ChangeDetectorRef,
  ) {

  }

  ngOnInit() {
    this._configSub = this.configService.templateConf$.subscribe((templateConf) => {
      if (templateConf) {
        this.config = templateConf;
        console.log(this.config)
      }
      //load layout
      // this.loadLayout();
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy() {
    if (this._configSub) {
      this._configSub.unsubscribe();
    }
  }

}
