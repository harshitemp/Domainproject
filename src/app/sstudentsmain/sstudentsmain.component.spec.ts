import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SstudentsmainComponent } from './sstudentsmain.component';

describe('SstudentsmainComponent', () => {
  let component: SstudentsmainComponent;
  let fixture: ComponentFixture<SstudentsmainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SstudentsmainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SstudentsmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
