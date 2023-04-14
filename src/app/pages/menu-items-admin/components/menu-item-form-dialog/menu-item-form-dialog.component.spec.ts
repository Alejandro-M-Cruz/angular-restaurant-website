import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemFormDialogComponent } from './menu-item-form-dialog.component';

describe('MenuItemFormDialogComponent', () => {
  let component: MenuItemFormDialogComponent;
  let fixture: ComponentFixture<MenuItemFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuItemFormDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuItemFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
