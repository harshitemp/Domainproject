import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleFormResponsesComponent } from './google-form-responses.component';

describe('GoogleFormResponsesComponent', () => {
  let component: GoogleFormResponsesComponent;
  let fixture: ComponentFixture<GoogleFormResponsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleFormResponsesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleFormResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
