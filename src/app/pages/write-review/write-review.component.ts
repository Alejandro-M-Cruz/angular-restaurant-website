import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Review} from "../../model/review.model";
import {ReviewsService} from "../../services/reviews/reviews.service";
import {Router} from "@angular/router";
import {AlertsService} from "../../services/alerts.service";
import {first} from "rxjs";
import {AlertError} from "../../errors/alert-error.errors";

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.css']
})
export class WriteReviewComponent implements OnInit {
  readonly userReview$ = this.reviewsService.getUserReview$()
  readonly descriptionMinLength = Review.MIN_DESCRIPTION_LENGTH
  readonly descriptionMaxLength = Review.MAX_DESCRIPTION_LENGTH
  form = this.fb.nonNullable.group({
    rating: [0, [
      Validators.required,
      Validators.min(Review.RATING_OPTIONS[0]),
      Validators.max(Review.RATING_OPTIONS[Review.RATING_OPTIONS.length - 1])
    ]],
    description: ['', [
      Validators.required,
      Validators.minLength(this.descriptionMinLength),
      Validators.maxLength(this.descriptionMaxLength)
    ]]
  })
  submitButtonDisabled = true

  constructor(
    private readonly fb: FormBuilder,
    private readonly reviewsService: ReviewsService,
    private readonly router: Router,
    private readonly alertsService: AlertsService
  ) {}

  ngOnInit() {
    this.initFormValueToUserReviewIfItExists()
  }

  private initFormValueToUserReviewIfItExists() {
    this.userReview$.pipe(first()).subscribe(review => {
      if (!review) {
        this.submitButtonDisabled = false
        return
      }
      this.form.setValue({rating: review.rating, description: review.description})
      this.onFormValueChangesDetermineIfReviewHasChanged(review)
    })
  }

  private onFormValueChangesDetermineIfReviewHasChanged(userReview: Review) {
    this.form.valueChanges.subscribe(formReview => {
      for (const key in formReview) {
        if (formReview[key as keyof typeof formReview] !== userReview[key]) {
          this.submitButtonDisabled = false
          return
        }
      }
      this.submitButtonDisabled = true
    })
  }

  async onSubmit() {
    try {
      await this.reviewsService.addOrUpdateUserReview(this.form.value as Review)
      await this.router.navigate(['/home'])
    } catch (e: any) {
      console.error(e)
      await this.alertsService.showErrorAlert(AlertError.UNKNOWN)
    }
  }

  async deleteUserReview() {
    await this.reviewsService.deleteUserReview()
  }

}
