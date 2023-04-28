import {Component} from '@angular/core';
import {Reservation} from "../../model/reservation.model";
import {ReservationsService} from "../../services/reservations/reservations.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../components/confirmation-dialog/confirmation-dialog.component";
import {translate} from "@ngneat/transloco";
import {formatDate} from "@angular/common";
import {UsersService} from "../../services/admin/users.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-reservations-admin',
  templateUrl: './admin-reservations.component.html',
  styleUrls: ['./admin-reservations.component.css']
})
export class AdminReservationsComponent {
  currentReservations$ = this.reservationsService.getActiveReservations()
  allReservations$ = this.reservationsService.getAllReservations()
  users$ = this.usersService.getUsers()
  selectedReservation: Reservation | null = null
  selectedReservationUser: User | null = null
  showPastReservations = false

  constructor(
    private readonly usersService: UsersService,
    private readonly reservationsService: ReservationsService,
    private readonly dialog: MatDialog
  ) {}

  toggleShowPastReservations() {
    this.showPastReservations = !this.showPastReservations
  }

  onSelectedReservationChanged(reservation: Reservation | null) {
    this.selectedReservation = reservation
    this.users$.subscribe(users => {
      this.selectedReservationUser = users.find(user => user.uid === reservation?.userId)!
    })
  }

  openCancelConfirmation() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: translate('confirmationTitles.cancelReservation'),
        message: translate(
          'confirmations.cancelReservationAdmin',
          {
            date: formatDate(
              this.selectedReservation!.date,
              translate('dateFormat'),
              translate('locale')
            ),
            time: this.selectedReservation!.time,
            email: this.selectedReservationUser?.email
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
      await this.reservationsService.cancelReservation(this.selectedReservation!.id!)
    } catch(e) {
      console.error(e)
    }
    this.selectedReservation = null
  }
}
