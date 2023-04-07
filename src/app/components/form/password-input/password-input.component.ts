import {Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.css']
})
export class PasswordInputComponent {
  @Input() isConfirmation = false
  @Input() control!: FormControl
  @Input() minLength!: number
  @Input() maxLength!: number
}
