import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {JobApplicationsService} from "../../services/job-applications/job-applications.service";
import {Subscription} from "rxjs";
import {AlertsService} from "../../services/alerts.service";
import {SuccessAlert} from "../../alerts/success-alert.alerts";
import {ErrorAlert} from "../../alerts/error-alert.alerts";
import {JobApplication} from "../../model/job-application.model";

@Component({
  selector: 'app-job-application',
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.css']
})
export class JobApplicationComponent implements OnInit, OnDestroy {
  userJobApplication?: JobApplication
  userJobApplicationSubscription?: Subscription
  userJobApplicationFileUrl?: string
  jobApplicationFile: File | null = null
  allowedFileExtensions = JobApplication.ALLOWED_FILE_EXTENSIONS

  constructor(
    public readonly location: Location,
    private readonly jobApplicationsService: JobApplicationsService,
    private readonly alertsService: AlertsService
  ) {}

  ngOnInit() {
    this.loadSafeUrl()
  }

  private loadSafeUrl() {
    this.userJobApplicationSubscription = this.jobApplicationsService.getUserJobApplication()
      .subscribe(userJobApplication => {
        if (!userJobApplication) return
        this.userJobApplication = userJobApplication
        this.userJobApplicationFileUrl = this.jobApplicationsService.getSafeJobApplicationFileUrl(userJobApplication)
      })
  }

  private async onInvalidFileSelected(fileError: ErrorAlert) {
    await this.alertsService.showErrorAlert(fileError)
    this.jobApplicationFile = null
  }

  async onFileInputChanged(file: File | null) {
    const fileError: ErrorAlert | null = file ? this.jobApplicationsService.validateJobApplicationFile(file) : null
    if (fileError) {
      await this.onInvalidFileSelected(fileError)
      return
    }
    this.jobApplicationFile = file
  }

  discardSelectedFile() {
    this.jobApplicationFile = null
  }

  async onSubmit() {
    try {
      await this.jobApplicationsService.uploadJobApplicationFile(this.jobApplicationFile!)
      await this.alertsService.showSuccessAlert(SuccessAlert.JOB_APPLICATION_SENT)
    } catch (e: any) {
      console.error(e)
      await this.alertsService.showErrorAlert(ErrorAlert.UNKNOWN)
    }
  }

  ngOnDestroy() {
    this.userJobApplicationSubscription?.unsubscribe()
  }
}
