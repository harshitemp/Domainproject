import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FeedbackComponent } from '../feedback/feedback.component';
import { Footer1Component } from '../footer1/footer1.component';
import { TopnavallComponent } from '../topnavall/topnavall.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pursuitmanager',
  standalone: true,
  imports: [TopnavallComponent, Footer1Component, CommonModule, ReactiveFormsModule, FeedbackComponent, HttpClientModule],
  templateUrl: './pursuitmanager.component.html',
  styleUrls: ['./pursuitmanager.component.css'],
})
export class PursuitmanagerComponent implements OnInit {
  recruitmentForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    // Initialize the form with reactive form controls and validators
    this.recruitmentForm = this.fb.group({
      recruiterName: ['', Validators.required],
      companyProfile: ['', Validators.required],
      jobTitle: ['', Validators.required],
      ctc: ['', Validators.required],
      eligibility: ['', Validators.required],
      skillSet: ['', Validators.required],
      selectionProcess: ['', Validators.required],
      location: ['', Validators.required],
      trainingNeed: ['', Validators.required],
      recruiterStatus: ['', Validators.required],
      registrationDeadline: ['', Validators.required],
      recruitmentDates: ['', Validators.required],
      driveMode: ['', Validators.required],
      additionalInfo: [''],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.recruitmentForm.valid) {
      // Make the POST request to your API with the form data
      this.http.post('http://localhost:5000/api/create-recruitment', this.recruitmentForm.value)
      .subscribe(
          response => {
            console.log('Form Submitted', response);
            alert('Form submitted successfully!'); // Show success message
            this.recruitmentForm.reset(); // Reset the form after submission
          },
          error => {
            console.error('Error submitting form', error);
            alert('Failed to submit form'); // Show error message
          }
        );
    } else {
      alert('Please fill out all required fields.'); // Alert if form is invalid
    }
  }

  logout() {
    this.router.navigate(['/home']); // Navigate to home on logout
  }
}
