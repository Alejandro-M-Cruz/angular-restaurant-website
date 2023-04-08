import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReservationsTableComponent } from './admin-reservations-table.component';

describe('AdminReservationsTableComponent', () => {
  let component: AdminReservationsTableComponent;
  let fixture: ComponentFixture<AdminReservationsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminReservationsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminReservationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
