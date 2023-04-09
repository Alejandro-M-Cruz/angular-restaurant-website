import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemsAdminComponent } from './menu-items-admin.component';

describe('MenuItemsAdminComponent', () => {
  let component: MenuItemsAdminComponent;
  let fixture: ComponentFixture<MenuItemsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuItemsAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuItemsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
