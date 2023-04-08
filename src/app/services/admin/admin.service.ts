import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserInfo} from "../../model/user-info.model";
import {filter} from "rxjs";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly API = environment.apiUrl

  constructor(private readonly http: HttpClient) { }

  getUsers() {
    return this.http.get<UserInfo[]>(`${this.API}/users`)
  }

  getUsersInfo(uidList: string[]) {
    return this.http.get<UserInfo>(`${this.API}/users`)
      .pipe(filter(user => uidList.includes(user.uid)))
  }
}
