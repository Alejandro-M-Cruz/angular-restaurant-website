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
  reservations: Reservation[] = []
  maxCustomers = 30
  availableTimes: string[] = []
  form = this.fb.group({
    date: [new Date(), Validators.required],
    time: ['', Validators.required],
    customers: [1, Validators.compose([
      Validators.required,
      Validators.min(1),
      Validators.max(this.maxCustomers),
      Validators.maxLength(this.maxCustomers.toString().length)
    ])]
  })

  constructor(
    private readonly reservationsService: ReservationsService,
    private readonly fb: FormBuilder
  ) {
    this.reservationsService.getCurrentReservations().subscribe(reservations => {
      this.reservations = reservations
    })
    this.form.controls.date.valueChanges.subscribe(_ => {
      this.availableTimes = this.reservationsService.getAvailableTimes(this.form.controls.date.value!)
      if (this.availableTimes.length > 0) {
        this.form.controls.time.enable()
      } else {
        this.form.controls.time.disable()
        window.location.reload()
        return
      }
      if (!this.availableTimes.includes(this.form.controls.time.value!))
        this.form.controls.time.setValue(this.availableTimes[0])
    })
  }

  isDateValid(date: Date | null) {
    return date !== null && this.reservationsService.isDateAvailable(date)
  }

  async onSubmit() {
    try {
      await this.reservationsService.addReservation(this.form.value as Reservation)
    } catch (e) {
      console.error(e)
    }
  }
}
