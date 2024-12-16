import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataupcomingComponent } from './dataupcoming.component';

describe('DataupcomingComponent', () => {
  let component: DataupcomingComponent;
  let fixture: ComponentFixture<DataupcomingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataupcomingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataupcomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
