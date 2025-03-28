import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CooordinatordashboardComponent } from './cooordinatordashboard.component';

describe('CooordinatordashboardComponent', () => {
  let component: CooordinatordashboardComponent;
  let fixture: ComponentFixture<CooordinatordashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CooordinatordashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CooordinatordashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
