import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsPreviewComponent } from './reviews-preview.component';

describe('ReviewsComponent', () => {
  let component: ReviewsPreviewComponent;
  let fixture: ComponentFixture<ReviewsPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewsPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
