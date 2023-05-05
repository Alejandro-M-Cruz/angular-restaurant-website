import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Review} from "../../model/review.model";
import {ReviewsService} from "../../services/reviews/reviews.service";
import {Router} from "@angular/router";
import {AlertsService} from "../../services/alerts.service";

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.css']
})
export class WriteReviewComponent {
  form = this.fb.nonNullable.group({
    rating: [0, [
      Validators.required,
      Validators.min(Review.RATING_OPTIONS[0]),
      Validators.max(Review.RATING_OPTIONS[Review.RATING_OPTIONS.length - 1])
    ]],
    description: ['', [
      Validators.required,
      Validators.min(Review.MIN_DESCRIPTION_LENGTH),
      Validators.max(Review.MAX_DESCRIPTION_LENGTH)
    ]]
  })

  constructor(
    private readonly fb: FormBuilder,
    private readonly reviewsService: ReviewsService,
    private readonly router: Router,
    private readonly alertsService: AlertsService
  ) { }

  async onSubmit() {
    try {
      await this.reviewsService.addReview(this.form.value as Review)
      await this.router.navigate(['/home'])
    } catch (e: any) {

    }
  }
}
