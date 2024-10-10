import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoGridComponent } from './logo-grid.component';

describe('LogoGridComponent', () => {
  let component: LogoGridComponent;
  let fixture: ComponentFixture<LogoGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
