import {AfterViewInit, ChangeDetectorRef, Component, HostListener, inject, OnDestroy, OnInit} from '@angular/core';
import {LayoutService} from "../../services/layout.service";
import {ConfigService} from "../../services/config.service";
import {Subscription} from "rxjs";
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {Router, RouterLink} from "@angular/router";
import {ToggleFullscreenDirective} from "../../directives/toggle-fullscreen.directive";
import {AuthService} from "../../auth/auth.service";
import {IconsModule} from "../../modules/icons.module";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    IconsModule,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
    NgbDropdownItem,
    RouterLink,
    ToggleFullscreenDirective
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  private layoutService: LayoutService = inject(LayoutService);
  private configService: ConfigService = inject(ConfigService);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private authService: AuthService = inject(AuthService);
  protected router: Router = inject(Router);

  layoutSub!: Subscription;
  configSub!: Subscription;
  hideSidebar: boolean = true;
  isSmallScreen = false;
  protected innerWidth: any;
  public config: any = {};
  toggleClass = "maximize";
  user: any = {
    name: 'John Doe',
    avatar: 'assets/img/sidebar-bg/04.jpg'
  };

  constructor() {
    this.layoutSub = this.layoutService.toggleSidebar$.subscribe(
      isShow => {
        this.hideSidebar = !isShow;
      });
  }

  ngOnInit() {
    this.isSmallScreen = this.innerWidth < 1200;
  }

  ngAfterViewInit() {
    this.configSub = this.configService.templateConf$.subscribe((templateConf) => {
      if (templateConf) {
        this.config = templateConf;
      }
      this.loadLayout();
      this.cdr.markForCheck();

    })
  }

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
    if (this.configSub) {
      this.configSub.unsubscribe();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = event.target.innerWidth;
    this.isSmallScreen = this.innerWidth < 1200;
  }

  loadLayout() {

  }

  toggleSidebar() {
    this.layoutService.toggleSidebarSmallScreen(this.hideSidebar);
  }

  ToggleClass() {
    if (this.toggleClass === "maximize") {
      this.toggleClass = "minimize";
    } else {
      this.toggleClass = "maximize";
    }
  }

  toggleNotificationSidebar() {
    this.layoutService.toggleNotificationSidebar(true);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/contents/login']).then();
  }

}
