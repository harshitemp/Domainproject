import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversitymainComponent } from './universitymain.component';

describe('UniversitymainComponent', () => {
  let component: UniversitymainComponent;
  let fixture: ComponentFixture<UniversitymainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniversitymainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversitymainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
