import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorsdashboardComponent } from './coordinatorsdashboard.component';

describe('CoordinatorsdashboardComponent', () => {
  let component: CoordinatorsdashboardComponent;
  let fixture: ComponentFixture<CoordinatorsdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoordinatorsdashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoordinatorsdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
