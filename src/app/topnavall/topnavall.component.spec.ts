import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopnavallComponent } from './topnavall.component';

describe('TopnavallComponent', () => {
  let component: TopnavallComponent;
  let fixture: ComponentFixture<TopnavallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopnavallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopnavallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
