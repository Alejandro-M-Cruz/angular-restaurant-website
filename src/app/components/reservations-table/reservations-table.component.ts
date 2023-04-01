import {Component, Input} from '@angular/core';
import {Reservation} from "../../model/reservation.model";

@Component({
  selector: 'app-reservations-table',
  templateUrl: './reservations-table.component.html',
  styleUrls: ['./reservations-table.component.css']
})
export class ReservationsTableComponent {
  @Input() reservations!: Reservation[];
  selectedRow: Reservation | null = null;

  onRowClicked(row: Reservation) {
    this.selectedRow === row ? this.selectedRow = null : this.selectedRow = row;
  }
}
