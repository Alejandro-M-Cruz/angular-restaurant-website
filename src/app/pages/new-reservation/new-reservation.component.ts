import {Component, OnInit} from '@angular/core';
import {ReservationsService} from "../../services/reservations.service";
import {Observable} from "rxjs";
import {Reservation} from "../../model/reservation.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.css']
})
export class NewReservationComponent {
  form = new FormGroup({
    date: new FormControl<Date | null>(null, Validators.required),
    time: new FormControl<string | null>(null, Validators.required),
    customers: new FormControl<number | null>(1, Validators.required)
  })
  reservations: Reservation[] = []
  timeInputDisabled = this.form.controls.date.value === null;
  availableTimes = ['12:00', '12:30', '16:00']

  constructor(
    private readonly reservationsService: ReservationsService
  ) {
    reservationsService.getCurrentReservations().subscribe(reservations => {
      this.reservations = reservations
    })
  }

  isDateValid(date: Date | null) {
    return date !== null && this.reservationsService.isDateWithinRange(date)
  }
}
