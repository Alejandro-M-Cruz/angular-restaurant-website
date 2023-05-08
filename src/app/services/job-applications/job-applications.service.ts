import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  getDoc, orderBy,
  query,
  setDoc,
  where
} from "@angular/fire/firestore";
import {getDownloadURL, ref, Storage, uploadBytes} from "@angular/fire/storage";
import {UserService} from "../user/user.service";
import {JobApplication} from "../../model/job-application.model";
import {firstValueFrom, map, Observable} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class JobApplicationsService {
  private readonly jobApplicationsCollection = collection(this.firestore, 'job_applications')
  private readonly jobApplicationsStorage = 'job_applications'

  constructor(
    private firestore: Firestore,
    private storage: Storage,
    private domSanitizer: DomSanitizer,
    private userService: UserService
  ) { }

  private firestoreDocumentDataToJobApplication(docData: any): JobApplication {
    return {
      ...docData,
      creationTimestamp: docData.creationTimestamp.toDate()
    } as JobApplication
  }

  getJobApplications(): Observable<JobApplication[]> {
    const q = query(this.jobApplicationsCollection, orderBy('creationTimestamp', 'asc'))
    return collectionData(q, {idField: 'userId'}).pipe(
      map(jobApplications => jobApplications.map(this.firestoreDocumentDataToJobApplication))
    ) as Observable<JobApplication[]>
  }

  getSafeJobApplicationFileUrl(jobApplication: JobApplication): string {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(jobApplication.fileUrl!) as string
  }

  getUserJobApplication(): Promise<JobApplication> {
    return firstValueFrom(
      docData(
        doc(this.jobApplicationsCollection, this.userService.currentUser!.uid),
        { idField: 'userId' }
      ).pipe(
        map(jobApplication => this.firestoreDocumentDataToJobApplication(jobApplication))
      )
    ) as Promise<JobApplication>
  }

  private async addJobApplication(jobApplicationFileUrl: string) {
    const userId = this.userService.currentUser!.uid
    const userEmail = this.userService.currentUser!.email
    await setDoc(
      doc(this.jobApplicationsCollection, userId),
      { userId, userEmail, fileUrl: jobApplicationFileUrl, creationTimestamp: new Date() } as JobApplication
    )
  }

  async uploadJobApplication(jobApplicationFile: File) {
    try {
      const jobApplicationsRef = ref(
        this.storage,
        `${this.jobApplicationsStorage}/${this.userService.currentUser!.uid}/${jobApplicationFile.name}`
      )
      const uploadResult = await uploadBytes(jobApplicationsRef, jobApplicationFile)
      const jobApplicationFileUrl = await getDownloadURL(uploadResult.ref)
      await this.addJobApplication(jobApplicationFileUrl)
    } catch (e: any) {
      console.error(e)
      throw e
    }
  }
}
