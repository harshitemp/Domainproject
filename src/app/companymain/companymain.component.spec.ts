import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanymainComponent } from './companymain.component';

describe('CompanymainComponent', () => {
  let component: CompanymainComponent;
  let fixture: ComponentFixture<CompanymainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanymainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanymainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
