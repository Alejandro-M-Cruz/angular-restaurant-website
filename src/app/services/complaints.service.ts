import { Injectable } from '@angular/core';
import {addDoc, collection, getDocs, getFirestore} from "@angular/fire/firestore";
import {Complaint} from "../model/complaint.model";

@Injectable({
  providedIn: 'root'
})
export class ComplaintsService {
  private firestore = getFirestore()

  getComplaints() {
    return getDocs(collection(this.firestore, 'complaints'));
  }

  addComplaint(complaint: Complaint) {
    return addDoc(collection(this.firestore, 'complaints'), complaint);
  }
}
