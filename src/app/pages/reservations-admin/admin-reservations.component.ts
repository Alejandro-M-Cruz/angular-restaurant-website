import {Component, OnInit} from '@angular/core';
import {Reservation} from "../../model/reservation.model";
import {ReservationsService} from "../../services/reservations.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../components/confirmation-dialog/confirmation-dialog.component";
import {translate} from "@ngneat/transloco";
import {formatDate} from "@angular/common";
import {AdminService} from "../../services/admin/admin.service";

@Component({
  selector: 'app-reservations-admin',
  templateUrl: './admin-reservations.component.html',
  styleUrls: ['./admin-reservations.component.css']
})
export class AdminReservationsComponent {
  currentReservations$ = this.reservationsService.getCurrentReservations()
  users$ = this.adminService.getUsers()
  selectedReservation: Reservation | null = null

  constructor(
    private readonly adminService: AdminService,
    private readonly reservationsService: ReservationsService,
    private readonly dialog: MatDialog
  ) {}

  onSelectedReservationChanged(reservation: Reservation | null) {
    this.selectedReservation = reservation
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
            email: this.selectedReservation!.userId
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
}
