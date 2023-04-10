import { Injectable } from '@angular/core';
import {MenuSection} from "../../model/menu-section.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MenuEditService {
  editedSection?: MenuSection

  constructor(private readonly http: HttpClient) {}

  addSection(menuSection: MenuSection): Observable<any> {
    return this.http.post(`${environment.apiUrl}/menu/sections/new`, menuSection)
  }

  deleteSection(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/menu/sections/${id}`)
  }

  editingSection(menuSection: MenuSection) {
    this.editedSection = menuSection
  }
}
