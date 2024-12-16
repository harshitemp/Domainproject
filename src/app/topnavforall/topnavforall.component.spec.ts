import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopnavforallComponent } from './topnavforall.component';

describe('TopnavforallComponent', () => {
  let component: TopnavforallComponent;
  let fixture: ComponentFixture<TopnavforallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopnavforallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopnavforallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
