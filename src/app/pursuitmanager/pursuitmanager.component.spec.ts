import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PursuitmanagerComponent } from './pursuitmanager.component';

describe('PursuitmanagerComponent', () => {
  let component: PursuitmanagerComponent;
  let fixture: ComponentFixture<PursuitmanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PursuitmanagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PursuitmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
