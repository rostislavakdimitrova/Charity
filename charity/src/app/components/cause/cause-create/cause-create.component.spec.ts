import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CauseCreateComponent } from './cause-create.component';

describe('CauseCreateComponent', () => {
  let component: CauseCreateComponent;
  let fixture: ComponentFixture<CauseCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CauseCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CauseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
