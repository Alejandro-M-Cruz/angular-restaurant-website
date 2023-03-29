import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent {
  @Input() timeInputDisabled!: boolean;
  @Input() availableTimes!: string[];
  @Output() selectedTime = new EventEmitter<string>();

  selectTime(time: string) {
    this.selectedTime.emit(time)
  }
}
