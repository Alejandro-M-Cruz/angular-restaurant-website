import {Component, ViewEncapsulation} from '@angular/core';
import {Reservation} from "../../model/reservation.model";

@Component({
  selector: 'app-user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.css']
})
export class UserReservationsComponent {
  displayedColumns = ['datetime', 'customers'];
  userReservations: Reservation[] = [
    {datetime: new Date(), customers: 5, userId: '123'},
    {datetime: new Date(), customers: 5, userId: '123'},
    {datetime: new Date(), customers: 5, userId: '123'},
    {datetime: new Date(), customers: 5, userId: '123'}
  ]

}
