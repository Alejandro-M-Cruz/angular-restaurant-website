import { Component } from '@angular/core';
import {Review} from "../../model/review.model";
import {ReviewsService} from "../../services/reviews/reviews.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews-preview.component.html',
  styleUrls: ['./reviews-preview.component.css']
})
export class ReviewsPreviewComponent {
  reviewsPreview$: Observable<Review[]> = this.reviewsService.getReviewsPreview$()

  constructor(private readonly reviewsService: ReviewsService) { }

}
