import {Component, OnInit} from '@angular/core';
import {ReservationsService} from "../../services/reservations.service";
import {Reservation} from "../../model/reservation.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.css']
})
export class NewReservationComponent implements OnInit {
  reservations: Reservation[] = []
  availableSeats = this.reservationsService.getMaxCustomers()
  availableTimes: string[] = []
  form = this.fb.group({
    date: [new Date(), Validators.required],
    time: ['', Validators.required],
    customers: [1, Validators.compose([
      Validators.required,
      Validators.min(1),
      Validators.max(this.availableSeats),
      Validators.maxLength(this.availableSeats.toString().length)
    ])]
  })

  constructor(
    private readonly reservationsService: ReservationsService,
    private readonly fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.reservationsService.getCurrentReservations().subscribe(reservations => {
      this.reservations = reservations
    })
    this.form.controls.date.valueChanges.subscribe(this.onDateChanged)
    this.form.controls.time.valueChanges.subscribe(this.onTimeChanged)
  }

  onDateChanged(date: Date | null) {
    this.availableTimes = this.reservationsService.getAvailableTimes(date!)
    if (this.availableTimes.length > 0) {
      this.form.controls.time.enable()
    } else {
      this.form.controls.time.disable()
      window.location.reload()
      return
    }
    if (!this.availableTimes.includes(this.form.controls.time.value!))
      this.form.controls.time.setValue(this.availableTimes[0])
  }

  onTimeChanged(time: string | null) {
    const max = this.reservationsService.getAvailableSeats(this.form.controls.date.value!, time!)
    if (max <= 0) {
      window.location.reload()
      return
    }
    this.form.controls.customers.removeValidators([Validators.max(this.availableSeats)])
    this.form.controls.customers.addValidators([Validators.max(this.availableSeats = max)])
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
