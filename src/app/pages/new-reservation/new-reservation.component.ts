import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReservationsService} from "../../services/reservations.service";
import {Reservation} from "../../model/reservation.model";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertsService} from "../../services/alerts.service";
import {AlertErrorCode} from "../../errors/alert-error.errors";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.css']
})
export class NewReservationComponent implements OnInit, OnDestroy {
  availableDates$: Observable<Date[]> = this.reservationsService.getAvailableDatesObservable()
  availableTimesForSelectedDate$?: Observable<string[]>
  availableSeatsForSelectedDateAndTime$?: Observable<number>
  availableSeatsSubscription?: Subscription
  form = this.fb.group({
    date: new FormControl<number | null>(null, Validators.required),
    time: ['', Validators.required],
    customers: [1]
  })

  constructor(
    private readonly reservationsService: ReservationsService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly alertsService: AlertsService
  ) { }

  ngOnInit() {
    this.disableTimeAndCustomersInputs()
    this.setDateAndTimeChangeObservers()
  }

  private getCustomersInputValidators(maxCustomers: number) {
    return [
      Validators.required,
      Validators.min(1),
      Validators.max(maxCustomers),
      Validators.maxLength(maxCustomers.toString().length)
    ]
  }

  private setDateAndTimeChangeObservers() {
    this.form.controls.date.valueChanges.subscribe(date => {
      this.onDateChanged(date === null ? null : new Date(date))
    })
    this.form.controls.time.valueChanges.subscribe(time => {
      this.onTimeChanged(time)
    })
  }

  private disableTimeAndCustomersInputs() {
    this.form.controls.time.disable()
    this.form.controls.customers.disable()
  }

  private enableTimeAndCustomersInputs() {
    this.form.controls.time.enable()
    this.form.controls.customers.enable()
  }

  private onDateChanged(date: Date | null) {
    if (date === null)
      return this.disableTimeAndCustomersInputs()
    this.availableTimesForSelectedDate$ = this.reservationsService.getAvailableTimesObservable(date)
    this.enableTimeAndCustomersInputs()
  }

  private onTimeChanged(time: string | null) {
    this.availableSeatsSubscription?.unsubscribe()
    this.availableSeatsForSelectedDateAndTime$ = this.reservationsService
      .getAvailableSeatsObservable(new Date(this.form.controls.date.value!),time!)
    this.availableSeatsSubscription = this.availableSeatsForSelectedDateAndTime$
      .subscribe(availableSeats => {
        this.form.controls.customers.clearValidators()
        this.form.controls.customers.setValidators(this.getCustomersInputValidators(availableSeats))
      })
  }

  async onSubmit() {
    try {
      await this.reservationsService.addReservation(this.form.value as Reservation)
      await this.router.navigate(['/user-reservations'])
    } catch (e) {
      console.error(e)
      await this.alertsService.showErrorAlert(AlertErrorCode.UNKNOWN)
    }
  }

  ngOnDestroy() {

  }
}
