import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsHomeDeliverySelectorComponent } from './is-home-delivery-selector.component';

describe('IsHomeDeliverySelectorComponent', () => {
  let component: IsHomeDeliverySelectorComponent;
  let fixture: ComponentFixture<IsHomeDeliverySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsHomeDeliverySelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IsHomeDeliverySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
