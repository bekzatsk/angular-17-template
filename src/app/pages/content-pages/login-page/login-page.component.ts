import {ChangeDetectorRef, Component, Inject, Renderer2} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  loginFormSubmitted = false;
  isLoginFailed = false;

  loginForm = new UntypedFormGroup({
    username: new UntypedFormControl('guest@mail.com', [Validators.required]),
    password: new UntypedFormControl('Password', [Validators.required]),
    rememberMe: new UntypedFormControl(true)
  });

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.renderer.addClass(this.document.body, "auth-page");
  }

  get lf() {
    return this.loginForm.controls;
  }

  onSubmit() {
    try {
      this.authService.signIn(this.lf['username'].value, this.lf['password'].value, this.lf['rememberMe'].value)
        .then((res) => {
          this.router.navigate(['/pages/test']).then();
        });
    } catch (e) {
      this.isLoginFailed = true;
      this.cdr.detectChanges();
    }
  }
}
