import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Review } from '../../../../models/Review';

@Component({
  selector: 'app-review-list',
   imports: [DatePipe],
  templateUrl: './review-list.html',
  styleUrl: './review-list.scss',
})
export class ReviewList {
  @Input() reviews: Review[] = [];
  @Input() total: number = 0;

  showAll = false;

  get visibleReviews() {
    return this.showAll ? this.reviews : this.reviews.slice(0, 2);
  }

  get stars() {
    return (rating: number) =>
      Array(5).fill(0).map((_, i) => i < Math.round(rating));
  }

  toggleShowAll() {
    this.showAll = !this.showAll;
  }
}
