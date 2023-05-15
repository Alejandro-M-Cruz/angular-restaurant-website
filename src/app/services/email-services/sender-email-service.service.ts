import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../environments/environment.development";
import { BuildEmail, email } from 'src/app/model/email.model';
import { User } from 'src/app/model/user';
import { Order } from 'src/app/model/order.model';
import { Reservation } from 'src/app/model/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class SenderEmailService {
constructor(private _http: HttpClient,) { }
  sendMessage(user:User,order?:Order,reservation?:Reservation) {
    let body;
    if(order){

      body = BuildEmail.sendEmail(user,"order",order);

    }else if(reservation){

      body = BuildEmail.sendEmail(user,"reservation",reservation);

    }else body = BuildEmail.sendEmail(user,"register");

    this._http.post(environment.apiUrl + '/email-confirmations', body).subscribe((res) => {
      console.log(res);
    });
  }


}
