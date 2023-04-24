import { Injectable } from '@angular/core';
import {addDoc, collection, collectionData, deleteDoc, doc, Firestore} from "@angular/fire/firestore";
import {Complaint} from "../model/complaint.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ComplaintsService {
  private readonly complaintsCollection = collection(this.firestore, 'complaints')

  constructor(private readonly firestore: Firestore) {}

  getComplaints(): Observable<Complaint[]> {
    return collectionData(this.complaintsCollection, {idField: 'id'}) as Observable<Complaint[]>;
  }

  async addComplaint(complaint: Complaint): Promise<void> {
    complaint.creationTimestamp = Date.now()
    await addDoc(this.complaintsCollection, complaint);
  }

  deleteComplaint(id: string): Promise<void> {
    return deleteDoc(doc(this.complaintsCollection, id));
  }

  getComplaintMinLength(): number {
    return Complaint.MIN_LENGTH
  }

  getComplaintMaxLength(): number {
    return Complaint.MAX_LENGTH
  }
}
