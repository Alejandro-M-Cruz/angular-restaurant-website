import {Component, OnDestroy, OnInit} from '@angular/core';
import {Reservation} from "../../model/reservation.model";
import {ReservationsService} from "../../services/reservations.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../components/confirmation-dialog/confirmation-dialog.component";
import {translate} from "@ngneat/transloco";
import {formatDate} from "@angular/common";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.css']
})
export class UserReservationsComponent implements OnInit, OnDestroy {
  reservationsSubscription?: Subscription
  userReservations: Reservation[] = []
  nReservations = 0
  maxReservations = this.reservationsService.getMaxReservations()
  selectedReservation: Reservation | null = null

  constructor(private readonly reservationsService: ReservationsService, private readonly dialog: MatDialog) {}

  ngOnInit() {
    this.reservationsSubscription = this.reservationsService.getUserCurrentReservations()
      .subscribe(reservations  => {
        this.onReservationsChange(reservations)
      })
  }

  private onReservationsChange(reservations: Reservation[]) {
    this.userReservations = reservations
    this.nReservations = reservations.length
  }

  onSelectedReservationChanged(reservation: Reservation | null) {
    this.selectedReservation = reservation
  }

  private openCancelConfirmation() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: translate('confirmationTitles.cancelReservation'),
        message: translate(
          'confirmations.cancelReservation',
            {
              date: formatDate(
                this.selectedReservation!.date,
                translate('dateFormat'),
                translate('locale')
              ),
              time: this.selectedReservation!.time
            }
          ),
        yes: translate('confirmationOptions.yes'),
        no: translate('confirmationOptions.no')
      }
    })
    dialogRef.afterClosed().subscribe(async result => {
      if (result) await this.cancelReservation()
    })
  }

  async onCancelReservation() {
    if (this.selectedReservation === null) return
    this.openCancelConfirmation()
  }

  private async cancelReservation() {
    try {
      await this.reservationsService.deleteReservation(this.selectedReservation!.id!)
    } catch(e) {
      console.error(e)
    }
    this.selectedReservation = null
  }

  ngOnDestroy() {
    this.reservationsSubscription?.unsubscribe()
  }
}

