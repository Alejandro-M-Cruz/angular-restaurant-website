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
  passwordMinLength = this.authService.getPasswordMinLength()
  passwordMaxLength = this.authService.getPasswordMaxLength()
  private readonly passwordValidators = [
    Validators.required,
    Validators.minLength(this.passwordMinLength),
    Validators.maxLength(this.passwordMaxLength)
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
      } catch (e: any) {
        if (e.name === 'emailAlreadyInUse')
          this.form.controls.email.setErrors({emailAlreadyInUse: true})
      }
    }
  }
}
