import { Injectable } from '@angular/core';
import {addDoc, collection, deleteDoc, doc, Firestore, getDocs} from "@angular/fire/firestore";
import {Complaint} from "../model/complaint.model";

@Injectable({
  providedIn: 'root'
})
export class ComplaintsService {
  constructor(private readonly firestore: Firestore) {}

  getComplaints() {
    return getDocs(collection(this.firestore, 'complaints'));
  }

  addComplaint(complaint: Complaint) {
    return addDoc(collection(this.firestore, 'complaints'), complaint);
  }

  deleteComplaint(id: string) {
    return deleteDoc(doc(this.firestore, 'complaints', id));
  }
}
