import { Injectable } from '@angular/core';
import {addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDocs} from "@angular/fire/firestore";
import {Complaint} from "../model/complaint.model";
import {Observable} from "rxjs";

const COMPLAINT_MIN_LENGTH = 20
const COMPLAINT_MAX_LENGTH = 2000

@Injectable({
  providedIn: 'root'
})
export class ComplaintsService {
  constructor(private readonly firestore: Firestore) {}

  getComplaints(): Observable<Complaint[]> {
    return collectionData(
      collection(this.firestore, 'complaints'),
      {idField: 'id'}
    ) as Observable<Complaint[]>;
  }

  addComplaint(complaint: Complaint) {
    complaint.creationTimestamp = Date.now()
    return addDoc(collection(this.firestore, 'complaints'), complaint);
  }

  deleteComplaint(id: string) {
    return deleteDoc(doc(this.firestore, 'complaints', id));
  }

  getComplaintMinLength() {
    return COMPLAINT_MIN_LENGTH
  }

  getComplaintMaxLength() {
    return COMPLAINT_MAX_LENGTH
  }
}
