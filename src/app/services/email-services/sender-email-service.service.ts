import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../environments/environment.development";
import { email } from 'src/app/model/email.model';

@Injectable({
  providedIn: 'root'
})
export class SenderEmailService {
constructor(private _http: HttpClient,) { }
  sendMessage(body:email) {
    this._http.post(environment.apiUrl + '/email-confirmations', body).subscribe((res) => {
      console.log(res);
    });
  }


}
