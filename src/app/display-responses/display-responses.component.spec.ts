import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayResponsesComponent } from './display-responses.component';

describe('DisplayResponsesComponent', () => {
  let component: DisplayResponsesComponent;
  let fixture: ComponentFixture<DisplayResponsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayResponsesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
