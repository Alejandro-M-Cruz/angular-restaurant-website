import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  passwordMinLength = this.authService.getPasswordMinLength()
  passwordMaxLength = this.authService.getPasswordMaxLength()
  readonly form = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.compose([
      Validators.required,
      Validators.minLength(this.passwordMinLength),
      Validators.maxLength(this.passwordMaxLength)
    ])],
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
        await this.authService.logIn(email!, password!)
        await this.router.navigate(['/home'])
      } catch (e: any) {
        if (e.name === 'wrongEmailOrPassword') {
          this.form.setErrors({wrongEmailOrPassword: true})
        }
      }
    }
  }
}
