import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent {
  dateFilter =  (d: Date | null): boolean => {
    const minDate = Date.now() + 1000 * 60 * 60 * 24 * 2
    const maxDate = Date.now() + 1000 * 60 * 60 * 24 * 30
    return d != null && !(d.getTime() <= minDate || d.getTime() >= maxDate)
  }

  date = new FormControl(new Date())
  isRequired = true
}
