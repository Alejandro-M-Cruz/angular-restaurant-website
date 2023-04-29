import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHistoryAdminComponent } from './order-history-admin.component';

describe('OrderHistoryAdminComponent', () => {
  let component: OrderHistoryAdminComponent;
  let fixture: ComponentFixture<OrderHistoryAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderHistoryAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderHistoryAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
