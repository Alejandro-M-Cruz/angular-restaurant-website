import { Component } from '@angular/core';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent {
  time: string | undefined

  timeValues = [
    '12:00', '12:30', '13:00', '14:00'
  ]
}
