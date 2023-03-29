import { Component } from '@angular/core';
import {Reservation} from "../../model/reservation.model";

@Component({
  selector: 'app-user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.css']
})
export class UserReservationsComponent {
  reservations = [
    {date: new Date(), time: "12:30", customers: 5, userId: "useruid"},
    {date: new Date(), time: "12:30", customers: 5, userId: "useruid"},
    {date: new Date(), time: "12:30", customers: 5, userId: "useruid"},
    {date: new Date(), time: "12:30", customers: 5, userId: "useruid"}
  ]

  displayedColumns: string[] = ['date', 'time', 'customers', 'userId'];
  clickedRows = new Set<Reservation>();

  onRowClicked(row: Reservation) {
    this.clickedRows.clear()
    this.clickedRows.has(row) ? this.clickedRows.delete(row) : this.clickedRows.add(row)
  }
}
