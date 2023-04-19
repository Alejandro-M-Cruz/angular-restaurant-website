import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSectionFormDialogComponent } from './menu-section-form-dialog.component';

describe('MenuSectionFormDialogComponent', () => {
  let component: MenuSectionFormDialogComponent;
  let fixture: ComponentFixture<MenuSectionFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuSectionFormDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuSectionFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
