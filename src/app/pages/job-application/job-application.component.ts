import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {JobApplicationsService} from "../../services/job-applications/job-applications.service";
import {Router} from "@angular/router";
import {JobApplication} from "../../model/job-application.model";

@Component({
  selector: 'app-job-application',
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.css']
})
export class JobApplicationComponent implements OnInit {
  userJobApplicationPromise: Promise<JobApplication> = this.jobApplicationsService.getUserJobApplication()
  userJobApplicationFileUrl?: string
  jobApplicationFile: File | null = null

  constructor(
    public readonly location: Location,
    private readonly jobApplicationsService: JobApplicationsService,
    private readonly router: Router
  ) {}

  async ngOnInit() {
    await this.loadSafeUrl()
  }

  private async loadSafeUrl() {
    this.userJobApplicationFileUrl = this.jobApplicationsService
      .getSafeJobApplicationFileUrl(await this.userJobApplicationPromise)
  }

  onFileInputChanged(file: File | null) {
    this.jobApplicationFile = file
  }

  discardSelectedFile() {
    this.jobApplicationFile = null
  }

  async onSubmit() {
    await this.jobApplicationsService.uploadJobApplication(this.jobApplicationFile!)

    await this.router.navigate(['/home'])
  }
}
