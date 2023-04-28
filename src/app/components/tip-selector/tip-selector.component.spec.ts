import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipSelectorComponent } from './tip-selector.component';

describe('TipSelectorComponent', () => {
  let component: TipSelectorComponent;
  let fixture: ComponentFixture<TipSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
