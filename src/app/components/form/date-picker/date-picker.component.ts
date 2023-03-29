import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent {
  @Input() dateFilter!:  (date: Date | null) => boolean;
  @Output() dateChanged = new EventEmitter<Date | null>();
  date = new FormControl(new Date())

  constructor() {
    this.date.valueChanges.subscribe((date: Date | null) => {
      this.dateChanged.emit(date)
    })
  }
}
