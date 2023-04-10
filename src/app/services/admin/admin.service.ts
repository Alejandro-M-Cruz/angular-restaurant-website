import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserInfo} from "../../model/user-info.model";
import {environment} from "../../../environments/environment.development";
import {MenuSection} from "../../model/menu-section.model";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly API = environment.apiUrl

  constructor(private readonly http: HttpClient) { }

  getUsers() {
    return this.http.get<UserInfo[]>(`${this.API}/users`)
  }

  addSection(menuSection: MenuSection) {
    return this.http.post<MenuSection>(`${this.API}/menu/sections`, menuSection)
  }

  deleteSection(id: string) {
    return this.http.delete(`${this.API}/menu/sections/${id}`)
  }

}
