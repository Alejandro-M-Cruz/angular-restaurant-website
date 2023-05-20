import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../environments/environment.development";
import { BuildEmail, email } from 'src/app/model/email.model';
import { User } from 'src/app/model/user';
import { Order } from 'src/app/model/order.model';
import { Reservation } from 'src/app/model/reservation.model';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class SenderEmailService {

  private user:User;
  constructor(
    private _http: HttpClient,
    private userService:UserService
  ) {
   }

  sendMessage(emailType:"register"|"order"|"reservation",data?:Order | Reservation,user?:User) {

    if(emailType === "order"){
      this.user = user!;
    }else {
      this.userService.reloadAuthState();
      this.user = this.userService.currentUser ?? new User();
    }


    let body = BuildEmail.sendEmail(this.user,emailType,data);

    this._http.post(environment.apiUrl + '/email-confirmations', body).subscribe((res) => {
      console.log(res);
    });
  }
}



