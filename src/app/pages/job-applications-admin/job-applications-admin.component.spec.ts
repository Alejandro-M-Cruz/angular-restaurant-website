import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationsAdminComponent } from './job-applications-admin.component';

describe('JobApplicationsAdminComponent', () => {
  let component: JobApplicationsAdminComponent;
  let fixture: ComponentFixture<JobApplicationsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobApplicationsAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobApplicationsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
