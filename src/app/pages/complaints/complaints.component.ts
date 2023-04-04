import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ComplaintsService} from "../../services/complaints.service";
import {Complaint} from "../../model/complaint.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent {
  form = this.fb.group({
    content: ['', Validators.compose([
      Validators.required,
      Validators.maxLength(this.complaintsService.getComplaintMaxLength())
    ])]
  })

  constructor(
    private readonly complaintsService: ComplaintsService,
    private readonly fb: FormBuilder,
    private readonly router: Router
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
