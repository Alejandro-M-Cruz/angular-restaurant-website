import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Reservation} from "../../../model/reservation.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-reservations-table',
  templateUrl: './reservations-table.component.html',
  styleUrls: ['./reservations-table.component.css']
})
export class ReservationsTableComponent {
  @Input() reservations: Reservation[] | null = []
  @Input() maxReservations!: number
  selectedRow: Reservation | null = null;
  @Output() selectedReservationChanged = new EventEmitter<Reservation | null>()

  onRowClicked(row: Reservation) {
    this.selectedRow === row ? this.selectedRow = null : this.selectedRow = row;
    this.selectedReservationChanged.emit(this.selectedRow)
  }
}
