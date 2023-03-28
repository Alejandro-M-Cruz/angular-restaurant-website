import { Injectable } from '@angular/core';
import {addDoc, collection, Firestore, getDocs} from "@angular/fire/firestore";
import {Complaint} from "../model/complaint.model";

@Injectable({
  providedIn: 'root'
})
export class ComplaintsService {
  constructor(private firestore: Firestore) {

  }

  getComplaints() {
    return getDocs(collection(this.firestore, 'complaints'));
  }

  addComplaint(complaint: Complaint) {
    return addDoc(collection(this.firestore, 'complaints'), complaint);
  }
}
