import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDeliverySelectorComponent } from './home-delivery-selector.component';

describe('IsHomeDeliverySelectorComponent', () => {
  let component: HomeDeliverySelectorComponent;
  let fixture: ComponentFixture<HomeDeliverySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDeliverySelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeDeliverySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
