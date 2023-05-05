import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore, limit,
  orderBy,
  query, setDoc
} from "@angular/fire/firestore";
import {Review, ReviewsSortingMethod} from "../../model/review.model";
import {map, Observable, take} from "rxjs";
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private readonly reviewsCollection = collection(this.firestore, 'reviews')

  constructor(private readonly firestore: Firestore, private readonly userService: UserService) { }

  private reviewsSortingMethodToFirestoreOrderBy(sortingMethod?: ReviewsSortingMethod): any {
    switch(sortingMethod) {
      case ReviewsSortingMethod.DATE_DESC:
        return orderBy('dateOfCreationOrLastUpdate', 'desc')
      case ReviewsSortingMethod.DATE_ASC:
        return orderBy('dateOfCreationOrLastUpdate', 'asc')
      case ReviewsSortingMethod.RATING_DESC:
        return orderBy('rating', 'desc')
      case ReviewsSortingMethod.RATING_ASC:
        return orderBy('rating', 'asc')
      default:
        return this.reviewsSortingMethodToFirestoreOrderBy(ReviewsSortingMethod.DEFAULT)
    }
  }

  private firestoreDocumentDataToReview(documentData?: any): Review {
    return {
      ...documentData,
      dateOfCreationOrLastUpdate: documentData.dateOfCreationOrLastUpdate.toDate()
    }
  }

  getAllReviews$(sortingMethod?: ReviewsSortingMethod): Observable<Review[]> {
    const q = query(
      this.reviewsCollection,
      this.reviewsSortingMethodToFirestoreOrderBy(sortingMethod)
    )
    return collectionData(q, {idField: 'userId'}).pipe(
      map(reviews => reviews.map(this.firestoreDocumentDataToReview))
    ) as Observable<Review[]>
  }

  getReviewsPreview$(sortingMethod?: ReviewsSortingMethod): Observable<Review[]> {
    const q = query(
      this.reviewsCollection,
      this.reviewsSortingMethodToFirestoreOrderBy(sortingMethod),
      limit(10)
    )
    return collectionData(q, {idField: 'userId'}).pipe(
      take(1),
      map(reviews => reviews.map(this.firestoreDocumentDataToReview))
    ) as Observable<Review[]>
  }

  async addReview(review: Review): Promise<void> {
    await setDoc(doc(this.reviewsCollection, this.userService.currentUser!.uid), {
      ...review,
      dateOfCreationOrLastUpdate: new Date(),
      wasUpdated: false
    })
  }

  async updateReview(reviewId: string, review: Review): Promise<void> {
    await setDoc(doc(this.reviewsCollection, reviewId), {
      ...review,
      dateOfCreationOrLastUpdate: new Date(),
      wasUpdated: true
    })
  }

  async deleteReview(reviewId: string): Promise<void> {
    return deleteDoc(doc(this.reviewsCollection, reviewId))
  }
}
