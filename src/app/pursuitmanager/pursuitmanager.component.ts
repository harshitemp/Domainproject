import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TopnavallComponent } from '../topnavall/topnavall.component';
import { Footer1Component } from "../footer1/footer1.component";
import { FeedbackComponent } from "../feedback/feedback.component";

@Component({
  selector: 'app-pursuitmanager',
  standalone:true,
  imports: [TopnavallComponent, Footer1Component, FeedbackComponent],
  templateUrl: './pursuitmanager.component.html',
  styleUrls: ['./pursuitmanager.component.css'],
})
export class PursuitmanagerComponent implements OnInit {
  recruitmentForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
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
      this.http.post('http://localhost:5000/api/recuritment', this.recruitmentForm.value)
        .subscribe(response => {
          console.log('Form Submitted', response);
          // Handle success response here
        }, error => {
          console.error('Error submitting form', error);
        });
    }
  }

  logout() {
    this.router.navigate(['/home']);
  }
}
