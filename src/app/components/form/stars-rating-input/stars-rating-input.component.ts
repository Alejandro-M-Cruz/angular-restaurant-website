import {Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Rating, Review} from "../../../model/review.model";

@Component({
  selector: 'app-stars-rating-input',
  templateUrl: './stars-rating-input.component.html',
  styleUrls: ['./stars-rating-input.component.css']
})
export class StarsRatingInputComponent {
  @Input() control!: FormControl
  maxRating = Review.RATING_OPTIONS[Review.RATING_OPTIONS.length - 1]

  onRatingChanged(rating: Rating) {
    this.control.setValue(rating)
  }

}
