import {Component, Input} from '@angular/core';
import {Review} from "../../model/review.model";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {
  @Input() review!: Review
  maxRating = Review.RATING_OPTIONS[Review.RATING_OPTIONS.length - 1]
}
