import {Component} from '@angular/core';
import {AuthenticationService} from "../../services/user/authentication.service";
import {FormBuilder, Validators} from "@angular/forms";
import {passwordMatchingValidator} from "../../validators/password-matching.validator";
import {Router} from "@angular/router";
import {FormError} from "../../alerts/form-error.alerts";
import {AlertsService} from "../../services/alerts.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {
  hidePassword = true
  usernameMaxLength = this.authService.getUsernameMaxLength()
  passwordMinLength = this.authService.getPasswordMinLength()
  passwordMaxLength = this.authService.getPasswordMaxLength()
  private readonly passwordValidators = [
    Validators.required,
    Validators.minLength(this.passwordMinLength),
    Validators.maxLength(this.passwordMaxLength)
  ]
  readonly form = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.maxLength(this.usernameMaxLength)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', this.passwordValidators],
    passwordConfirmation: ['', this.passwordValidators]
  }, {
    validators: passwordMatchingValidator
  })

  constructor(
    private readonly authService: AuthenticationService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly alertsService: AlertsService,
    public readonly location: Location
  ) {}

  async onSubmit() {
    try {
      const { username, email, password } = this.form.value
      await this.authService.signUp(username!, email!, password!)
      await this.router.navigate(['/home'])
    } catch (e: any) {
      console.error(e)
      if (e.name === FormError.EMAIL_ALREADY_IN_USE)
        return this.form.controls.email.setErrors({emailAlreadyInUse: true})
      await this.alertsService.showErrorAlert(e.name)
    }
  }

  onPasswordVisibilityChanged(hidePassword: boolean) {
    this.hidePassword = hidePassword
  }
}
