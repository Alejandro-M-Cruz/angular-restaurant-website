import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarsRatingInputComponent } from './stars-rating-input.component';

describe('StarsRatingInputComponent', () => {
  let component: StarsRatingInputComponent;
  let fixture: ComponentFixture<StarsRatingInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarsRatingInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarsRatingInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
