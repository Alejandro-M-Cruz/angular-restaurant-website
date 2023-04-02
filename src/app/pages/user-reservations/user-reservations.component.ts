import {Component, OnInit} from '@angular/core';
import {Reservation} from "../../model/reservation.model";
import {ReservationsService} from "../../services/reservations.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../components/confirmation-dialog/confirmation-dialog.component";
import {translate} from "@ngneat/transloco";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.css']
})
export class UserReservationsComponent implements OnInit{
  userReservations: Reservation[] = []
  maxReservations = 5
  selectedReservation: Reservation | null = null

  constructor(
    private readonly reservationsService: ReservationsService,
    private readonly dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.reservationsService.getUserCurrentReservations().subscribe(reservations  => {
      this.userReservations = reservations
    })
    /*this.userReservations = [
      {date: new Date(), time: '13:00', id: 'algo', customers: 13, userId: 'algo'},
    ]*/
  }

  onSelectedReservationChanged(reservation: Reservation | null) {
    this.selectedReservation = reservation
  }

  openCancelConfirmation() {
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

    }
    this.selectedReservation = null
  }
}
