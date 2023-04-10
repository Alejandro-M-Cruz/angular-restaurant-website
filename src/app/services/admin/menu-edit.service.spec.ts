import { TestBed } from '@angular/core/testing';

import { MenuEditService } from './menu-edit.service';

describe('MenuEditService', () => {
  let service: MenuEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
