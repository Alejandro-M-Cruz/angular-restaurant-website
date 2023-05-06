import {Component, OnInit} from '@angular/core';
import {Review} from "../../model/review.model";
import {ReviewsService} from "../../services/reviews/reviews.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {PermissionsService} from "../../services/user/permissions.service";

@Component({
  selector: 'app-reviews-preview',
  templateUrl: './reviews-preview.component.html',
  styleUrls: ['./reviews-preview.component.css']
})
export class ReviewsPreviewComponent {
  reviewsPreview$: Observable<Review[]> = this.reviewsService.getReviewsPreview$()
  userIsAdmin$: Observable<boolean> = this.permissionsService.isAdmin()

  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly router: Router,
    private readonly permissionsService: PermissionsService
  ) { }

  async navigateToWriteReview() {
    await this.router.navigate(['/write-review'])
  }

  async navigateToReviews() {
    await this.router.navigate(['/reviews'])
  }
}
