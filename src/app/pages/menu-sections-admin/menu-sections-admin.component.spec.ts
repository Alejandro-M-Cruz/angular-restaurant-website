import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSectionsAdminComponent } from './menu-sections-admin.component';

describe('MenuEditComponent', () => {
  let component: MenuSectionsAdminComponent;
  let fixture: ComponentFixture<MenuSectionsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuSectionsAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuSectionsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
