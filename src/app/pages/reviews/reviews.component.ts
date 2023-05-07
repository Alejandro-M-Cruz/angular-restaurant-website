import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReviewsService} from "../../services/reviews/reviews.service";
import {Review, ReviewsSortingMethod} from "../../model/review.model";
import {PageEvent} from "@angular/material/paginator";
import {Subscription} from "rxjs";
import {PermissionsService} from "../../services/user/permissions.service";
import {Location} from "@angular/common";
import {FormControl} from "@angular/forms";

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
  readonly reviewsSortingMethods = new Set(Object.keys(ReviewsSortingMethod)
    .map(key => ReviewsSortingMethod[key as keyof typeof ReviewsSortingMethod]))
  sortingMethodControl = new FormControl(ReviewsSortingMethod.DEFAULT, {nonNullable: true})
  sortingMethodSubscription?: Subscription

  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly permissionsService: PermissionsService,
    public readonly location: Location
  ) { }

  ngOnInit() {
    this.subscribeToReviewsObservable()
    this.subscribeToSortingMethodChanges()
  }

  private subscribeToReviewsObservable(sortingMethod?: ReviewsSortingMethod) {
    this.reviewsSubscription = this.reviewsService.getAllReviews$(sortingMethod)
      .subscribe(reviews => this.reviews = reviews)
  }

  private subscribeToSortingMethodChanges() {
    this.sortingMethodSubscription = this.sortingMethodControl.valueChanges
      .subscribe(sortingMethod => {
        this.onSortingMethodChanged(sortingMethod)
      })
  }

  private onSortingMethodChanged(sortingMethod: ReviewsSortingMethod) {
    this.reviewsSubscription?.unsubscribe()
    this.subscribeToReviewsObservable(sortingMethod)
  }

  onPageChanged($event: PageEvent) {
    this.pageIndex = $event.pageIndex
    this.pageSize = $event.pageSize
  }

  private destroySubscriptions() {
    this.reviewsSubscription?.unsubscribe()
    this.sortingMethodSubscription?.unsubscribe()
  }

  ngOnDestroy() {
    this.destroySubscriptions()
  }
}
