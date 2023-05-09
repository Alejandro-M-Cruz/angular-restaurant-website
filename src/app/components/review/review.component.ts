import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Review} from "../../model/review.model";
import { AuthenticationService } from 'src/app/services/user/authentication.service';
import { PermissionsService } from 'src/app/services/user/permissions.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {
  @Input() review!: Review
  @Input() isDeletable!: boolean
  @Output() reviewItemDeleted = new EventEmitter<Review>()
  maxRating = Review.RATING_OPTIONS[Review.RATING_OPTIONS.length - 1]

  deleteItem() {
    this.reviewItemDeleted.emit(this.review)
  }
}
