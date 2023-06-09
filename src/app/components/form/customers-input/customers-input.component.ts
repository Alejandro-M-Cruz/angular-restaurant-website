import {Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-customers-input',
  templateUrl: './customers-input.component.html',
  styleUrls: ['./customers-input.component.css']
})
export class CustomersInputComponent {
  @Input() maxCustomers: number | null = 0
  @Input() control!: FormControl
}
