import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentConfirmationComponent } from './recruitment-confirmation.component';

describe('RecruitmentConfirmationComponent', () => {
  let component: RecruitmentConfirmationComponent;
  let fixture: ComponentFixture<RecruitmentConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruitmentConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruitmentConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
