import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CauseEditComponent } from './cause-edit.component';

describe('CauseEditComponent', () => {
  let component: CauseEditComponent;
  let fixture: ComponentFixture<CauseEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CauseEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CauseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
