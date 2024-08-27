import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { SafePipe } from './safe.pipe';

describe('SafePipe', () => {
  let pipe: SafePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DomSanitizer], // Provide the DomSanitizer service
    });

    const sanitizer = TestBed.inject(DomSanitizer); // Inject DomSanitizer
    pipe = new SafePipe(sanitizer); // Pass it to the SafePipe constructor
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
