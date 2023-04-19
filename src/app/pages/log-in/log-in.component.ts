import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {FormErrorCode} from "../../errors/form-error.errors";
import {AlertsService} from "../../services/alerts.service";
import {AlertErrorCode} from "../../errors/alert-error.errors";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  passwordMinLength = this.authService.getPasswordMinLength()
  passwordMaxLength = this.authService.getPasswordMaxLength()
  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.minLength(this.passwordMinLength),
      Validators.maxLength(this.passwordMaxLength)
    ]],
  })

  constructor(
    private readonly authService: AuthenticationService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly alertsService: AlertsService
  ) {}

  async onSubmit() {
    try {
      const { email, password } = this.form.value
      await this.authService.logIn(email!, password!)
      await this.router.navigate(['/home'])
    } catch (e: any) {
      console.error(e)
      if (e.name === FormErrorCode.WRONG_EMAIL_OR_PASSWORD)
        return this.form.setErrors({wrongEmailOrPassword: true})
      await this.alertsService.showErrorAlert(e.name)
    }
  }
}
