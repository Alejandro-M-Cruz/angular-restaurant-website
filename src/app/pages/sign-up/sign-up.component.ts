import { Component } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {FormBuilder, Validators} from "@angular/forms";
import {passwordMatchingValidator} from "../../validators/password-matching.validator";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {
  private readonly passwordValidators = [
    Validators.required,
    Validators.minLength(this.authService.getPasswordMinLength()),
    Validators.maxLength(this.authService.getPasswordMaxLength())
  ]
  readonly form = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.compose(this.passwordValidators)],
    passwordConfirmation: ['', Validators.compose(this.passwordValidators)]
  }, {
    validators: passwordMatchingValidator
  })

  constructor(
    private readonly authService: AuthenticationService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {}

  async onSubmit() {
    if (this.form.valid) {
      const { email, password } = this.form.value
      try {
        await this.authService.signUp(email!, password!)
        await this.router.navigate(['/home'])
      } catch (e) {
        console.error(e)
      }
    }
  }
}
