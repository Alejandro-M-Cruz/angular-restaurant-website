import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReviewsService} from "../../services/reviews/reviews.service";
import {Review, ReviewsSortingMethod} from "../../model/review.model";
import {PageEvent} from "@angular/material/paginator";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit, OnDestroy {
  reviews?: Review[]
  reviewsSubscription?: Subscription
  pageIndex = 0
  pageSize = 6

  constructor(private readonly reviewsService: ReviewsService) { }

  ngOnInit() {
    this.subscribeToReviewsObservable()
  }

  private subscribeToReviewsObservable(sortingMethod?: ReviewsSortingMethod) {
    this.reviewsSubscription = this.reviewsService.getAllReviews$(sortingMethod)
      .subscribe(reviews => this.reviews = reviews)
  }

  onSortingMethodChanged(sortingMethod: ReviewsSortingMethod) {
    this.reviewsSubscription?.unsubscribe()
    this.subscribeToReviewsObservable(sortingMethod)
  }

  onPageChanged($event: PageEvent) {
    this.pageIndex = $event.pageIndex
    this.pageSize = $event.pageSize
  }

  ngOnDestroy() {
    this.reviewsSubscription?.unsubscribe()
  }
}
