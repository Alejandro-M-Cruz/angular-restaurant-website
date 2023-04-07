import { Component } from '@angular/core';
import {ComplaintsService} from "../../services/complaints.service";

@Component({
  selector: 'app-complaints-admin',
  templateUrl: './complaints-admin.component.html',
  styleUrls: ['./complaints-admin.component.css']
})
export class ComplaintsAdminComponent {
  complaints = this.complaintsService.getComplaints()

  constructor(private readonly complaintsService: ComplaintsService) {
  }
}
