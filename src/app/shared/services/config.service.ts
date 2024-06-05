import {Injectable} from "@angular/core";
import {ITemplateConfig} from "../interfaces/template-config.metada";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ConfigService {
  public templateConf: ITemplateConfig = this.setConfigValue();
  templateConfSubject = new BehaviorSubject<ITemplateConfig>(this.templateConf);
  templateConf$ = this.templateConfSubject.asObservable();

  setConfigValue() {
    return this.templateConf = {
      layout: {
        variant: "Light",
        menuPosition: "Side",
        customizer: {
          hidden: true
        },
        navbar: {
          type: 'Fixed'
        },
        sidebar: {
          collapsed: true,
          size: "md",
          backgroundColor: "black",
          backgroundImage: true,
          backgroundImageURL: "assets/img/sidebar-bg/01.jpg"
        }
      }
    };
  }

  applyTemplateConfigChange(tempConfig: ITemplateConfig) {
    this.templateConf = Object.assign(this.templateConf, tempConfig);
    this.templateConfSubject.next(this.templateConf);
  }
}
