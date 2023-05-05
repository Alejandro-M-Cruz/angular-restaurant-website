import { Component } from '@angular/core';
import {Review} from "../../model/review.model";
import {ReviewsService} from "../../services/reviews/reviews.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reviews-preview',
  templateUrl: './reviews-preview.component.html',
  styleUrls: ['./reviews-preview.component.css']
})
export class ReviewsPreviewComponent {
  reviewsPreview$: Observable<Review[]> = this.reviewsService.getReviewsPreview$()

  constructor(private readonly reviewsService: ReviewsService, private readonly router: Router) { }

  async navigateToWriteReview() {
    await this.router.navigate(['/write-review'])
  }
}
