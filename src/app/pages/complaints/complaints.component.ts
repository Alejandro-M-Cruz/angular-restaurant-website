import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ComplaintsService} from "../../services/complaints/complaints.service";
import {Complaint} from "../../model/complaint.model";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent {
  complaintMinLength = this.complaintsService.getComplaintMinLength()
  complaintMaxLength = this.complaintsService.getComplaintMaxLength()
  form = this.fb.nonNullable.group({
    content: ['', [
      Validators.required,
      Validators.minLength(this.complaintMinLength),
      Validators.maxLength(this.complaintMaxLength)
    ]]
  })

  constructor(
    private readonly complaintsService: ComplaintsService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    public readonly location: Location
  ) { }

  async onSubmit() {
    try {
      await this.complaintsService.addComplaint(this.form.value as Complaint)
      await this.router.navigate(['/home'])
    } catch (e) {
      console.error(e)
    }
  }
}
