import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlreadySignedUpLinkComponent } from './already-signed-up-link.component';

describe('AlreadyLoggedLinkComponent', () => {
  let component: AlreadySignedUpLinkComponent;
  let fixture: ComponentFixture<AlreadySignedUpLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlreadySignedUpLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlreadySignedUpLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
