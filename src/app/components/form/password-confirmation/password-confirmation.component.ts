import {Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-password-confirmation',
  templateUrl: './password-confirmation.component.html',
  styleUrls: ['./password-confirmation.component.css']
})
export class PasswordConfirmationComponent {
  @Input() control!: FormControl
  @Input() hidePassword!: boolean
}
