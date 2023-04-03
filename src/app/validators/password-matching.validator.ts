import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const passwordMatchingValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')!
  const confirmation = control.get('passwordConfirmation')!
  return password.value === confirmation.value ? null : { passwordMismatch: true }
};
