import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserInfo} from "../../model/user-info.model";
import {environment} from "../../../environments/environment.development";
import {MenuSection} from "../../model/menu-section.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private readonly http: HttpClient) { }

  getUsers(): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(`${environment.apiUrl}/users`)
  }
}
