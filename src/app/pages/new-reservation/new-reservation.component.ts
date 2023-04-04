import {Component, OnInit} from '@angular/core';
import {ReservationsService} from "../../services/reservations.service";
import {Reservation} from "../../model/reservation.model";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.css']
})
export class NewReservationComponent {
  reservations: Reservation[] = []
  availableDates: Date[] = []
  availableTimes: string[] = []
  availableSeats = this.reservationsService.getMaxCustomers()
  form = this.fb.group({
    date: new FormControl<Date | null>(null, Validators.required),
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
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {
    this.disableInputs()
    this.reservationsService.getCurrentReservations().subscribe(reservations => {
      this.onReservationsChanged(reservations)
    })
    this.form.controls.date.valueChanges.subscribe(date => {
      this.onDateChanged(date)
    })
    this.form.controls.time.valueChanges.subscribe(time => {
      this.onTimeChanged(time)
    })
  }

  onReservationsChanged(reservations: Reservation[]) {
    this.reservations = reservations
    this.availableDates = this.reservationsService.getAvailableDates()
  }

  onDateChanged(date: Date | null) {
    if (date === null) {
      this.disableInputs()
      return
    }
    this.availableTimes = this.reservationsService.getAvailableTimes(date!)
    if (this.availableTimes.length === 0) {
      this.disableInputs()
      return
    }
    this.enableInputs()
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

  private disableInputs() {
    this.form.controls.time.disable()
    this.form.controls.customers.disable()
  }

  private enableInputs() {
    this.form.controls.time.enable()
    this.form.controls.customers.enable()
  }

  async onSubmit() {
    try {
      await this.reservationsService.addReservation(this.form.value as Reservation)
      await this.router.navigate(['/reservations'])
    } catch (e) {
      console.error(e)
    }
  }

}
