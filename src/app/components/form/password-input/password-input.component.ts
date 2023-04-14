import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.css']
})
export class PasswordInputComponent {
  @Input() control!: FormControl
  @Input() minLength!: number
  @Input() maxLength!: number
  @Output() hidePasswordChanged = new EventEmitter<boolean>()
  hidePassword = true

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword
    this.hidePasswordChanged.emit(this.hidePassword)
  }
}
