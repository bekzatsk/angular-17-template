import {Component, Inject, Renderer2} from '@angular/core';
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";
import {DOCUMENT, NgIf} from "@angular/common";
import {ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [NgbAlertModule, ReactiveFormsModule, NgIf],
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
    private renderer: Renderer2
  ) {
    this.renderer.addClass(this.document.body, "auth-page");
  }

  get lf() {
    return this.loginForm.controls;
  }

  onSubmit() {

  }
}
