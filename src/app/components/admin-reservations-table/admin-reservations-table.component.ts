import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Reservation} from "../../model/reservation.model";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-admin-reservations-table',
  templateUrl: './admin-reservations-table.component.html',
  styleUrls: ['./admin-reservations-table.component.css']
})
export class AdminReservationsTableComponent {
  @Input() reservations: Reservation[] | null = []
  selectedRow: Reservation | null = null;
  @Output() selectedReservationChanged = new EventEmitter<Reservation | null>()
  pageSize = 5
  pageIndex = 0

  onRowClicked(row: Reservation) {
    this.selectedRow === row ? this.selectedRow = null : this.selectedRow = row;
    this.selectedReservationChanged.emit(this.selectedRow)
  }

  onPageChanged(e: PageEvent) {
    this.pageSize = e.pageSize
    this.pageIndex = e.pageIndex
  }
}
