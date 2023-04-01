import {Component, OnInit} from '@angular/core';
import {Reservation} from "../../model/reservation.model";
import {ReservationsService} from "../../services/reservations.service";

@Component({
  selector: 'app-user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.css']
})
export class UserReservationsComponent implements OnInit{
  userReservations: Reservation[] = []

  constructor(private readonly reservationsService: ReservationsService) {}

  async ngOnInit() {
    this.userReservations = await this.reservationsService.getUserCurrentReservations()
  }

}
