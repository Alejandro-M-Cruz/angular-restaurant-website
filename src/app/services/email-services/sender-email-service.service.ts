import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class SenderEmailService {
constructor(private _http: HttpClient) { }
  sendMessage(body:any) {
    this._http.post(environment.apiUrl + '/email-confirmations', body).subscribe((res) => {
      console.log(res);
    });
  }
}
