import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ReservationsService} from "../../../services/reservations.service";

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent {
  @Input() dateFilter!:  (date: Date | null) => boolean;
  @Input() control!: FormControl
}
