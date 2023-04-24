import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../model/user";
import {environment} from "../../../environments/environment.development";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private readonly http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`)
  }
}
