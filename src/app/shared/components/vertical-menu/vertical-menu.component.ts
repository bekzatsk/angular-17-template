import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ConfigService} from "../../services/config.service";
import {Subscription} from "rxjs";
import {ITemplateConfig} from "../../interfaces/template-config.metada";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-vertical-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vertical-menu.component.html',
  styleUrl: './vertical-menu.component.scss'
})
export class VerticalMenuComponent implements OnInit, OnDestroy {
  private _configSub!: Subscription;
  public config!: ITemplateConfig;
  bgImage: string = '';

  constructor(
    private configService: ConfigService,
    private cdr: ChangeDetectorRef,
  ) {

  }

  ngOnInit() {
    this._configSub = this.configService.templateConf$.subscribe((templateConf) => {
      if (templateConf) {
        this.config = templateConf;
        this.bgImage = this.config.layout.sidebar.backgroundImageURL
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
