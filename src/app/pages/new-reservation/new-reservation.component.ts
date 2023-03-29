import { Component } from '@angular/core';
import {ReservationsService} from "../../services/reservations.service";

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.css']
})
export class NewReservationComponent {
  timeInputDisabled = true;
  availableTimes = ['12:00', '12:30', '16:00']

  constructor(private reservationsService: ReservationsService) {
  }

  onDateChanged(date: Date | null) {
    this.timeInputDisabled = date === null
  }

  isDateValid(date: Date | null) {
    return date !== null && this.reservationsService.isDateAvailable(date)
  }
}
