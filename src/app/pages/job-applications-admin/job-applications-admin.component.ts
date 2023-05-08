import { Component } from '@angular/core';
import {JobApplicationsService} from "../../services/job-applications/job-applications.service";

@Component({
  selector: 'app-job-applications-admin',
  templateUrl: './job-applications-admin.component.html',
  styleUrls: ['./job-applications-admin.component.css']
})
export class JobApplicationsAdminComponent {
  readonly jobApplications$ = this.jobApplicationsService.getJobApplications()

  constructor(private readonly jobApplicationsService: JobApplicationsService) {}
}
