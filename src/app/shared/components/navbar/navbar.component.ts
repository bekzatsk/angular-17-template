import {AfterViewInit, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {LayoutService} from "../../services/layout.service";
import {ConfigService} from "../../services/config.service";
import {Subscription} from "rxjs";
import {FeatherModule} from "angular-feather";
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {Router, RouterLink} from "@angular/router";
import {ToggleFullscreenDirective} from "../../directives/toggle-fullscreen.directive";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    FeatherModule,
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

  constructor(
    private layoutService: LayoutService,
    private configService: ConfigService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    protected router: Router
  ) {
    this.layoutSub = layoutService.toggleSidebar$.subscribe(
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
    if (this.innerWidth < 1200) {
      this.isSmallScreen = true;
    }
    else {
      this.isSmallScreen = false;
    }
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
