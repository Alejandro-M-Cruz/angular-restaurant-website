import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReservationsService} from "../../services/reservations/reservations.service";
import {Reservation} from "../../model/reservation.model";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertsService} from "../../services/alerts.service";
import {ErrorAlert} from "../../alerts/error-alert.alerts";
import {catchError, first, Observable, Subscription} from "rxjs";
import {FormError} from "../../alerts/form-error.alerts";
import {Location} from "@angular/common";
import { SenderEmailService } from 'src/app/services/email-services/sender-email-service.service';

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.css']
})
export class NewReservationComponent implements OnInit, OnDestroy {
  availableDates$: Observable<Date[]> = this.reservationsService.getAvailableDatesObservable()
  availableTimesForSelectedDate$?: Observable<string[]>
  availableSeatsForSelectedDateAndTime$?: Observable<number>
  dateInputSubscription?: Subscription
  timeInputSubscription?: Subscription
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
    private readonly alertsService: AlertsService,
    public readonly location: Location,
    private readonly senderService:SenderEmailService,
  ) { }

  ngOnInit() {
    this.disableInputs('time', 'customers')
    this.setDateAndTimeChangeObservers()
  }

  private disableInputs(...inputs: string[]) {
    inputs.forEach(input => this.form.get(input)?.disable())
  }

  private enableInputs(...inputs: string[]) {
    inputs.forEach(input => this.form.get(input)?.enable())
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
    this.dateInputSubscription = this.form.controls.date.valueChanges.subscribe(date => {
      this.onDateChanged(date ? new Date(date) : null)
    })
    this.timeInputSubscription = this.form.controls.time.valueChanges.subscribe(time => {
      this.onTimeChanged(time)
    })
  }

  private onDateChanged(date: Date | null) {
    if (!date)
      return this.disableInputs('time', 'customers')
    this.availableTimesForSelectedDate$ = this.reservationsService.getAvailableTimesObservable(date)
    this.enableInputs('time')
  }

  private onTimeChanged(time: string | null) {
    if (!time)
      return this.disableInputs('customers')
    this.availableSeatsSubscription?.unsubscribe()
    this.availableSeatsForSelectedDateAndTime$ = this.reservationsService
      .getAvailableSeatsObservable(new Date(this.form.controls.date.value!),time!)
    this.availableSeatsSubscription = this.availableSeatsForSelectedDateAndTime$
      .subscribe(availableSeats => {
        this.form.controls.customers.clearValidators()
        this.form.controls.customers.setValidators(this.getCustomersInputValidators(availableSeats))
      })
    this.enableInputs('customers')
  }

  async onSubmitAddReservation() {
      this.reservationsService.addReservation(this.form.value as Reservation)
        .subscribe({
          next: addPromise => {
            addPromise
              .then(() => {
                this.senderService.sendMessage("reservation",this.form.value as Reservation);
                this.router.navigate(['/user-reservations'])
              })
              .catch((e: any) => this.showErrorAlert(e.name))
          },
          error: e => this.showErrorAlert(e.name)
        })




  }

  private async showErrorAlert(errorName: string) {
    switch(errorName) {
      case FormError.RESERVATION_AT_THE_SAME_TIME:
        await this.alertsService.showErrorAlert(errorName)
        break
      case FormError.EXCEEDED_MAX_RESERVATIONS_AT_THE_SAME_DATE:
        await this.alertsService.showErrorAlert(errorName)
        break
      default:
        await this.alertsService.showErrorAlert(ErrorAlert.UNKNOWN)
        break
    }
  }

  ngOnDestroy() {
    this.dateInputSubscription?.unsubscribe()
    this.timeInputSubscription?.unsubscribe()
    this.availableSeatsSubscription?.unsubscribe()
  }
}
