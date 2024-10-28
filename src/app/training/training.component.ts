import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Import FormBuilder and Validators
import { SidenavComponent } from '../sidenav/sidenav.component';
import { Footer1Component } from '../footer1/footer1.component';
import { FeedbackComponent } from '../feedback/feedback.component';

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [SidenavComponent, Footer1Component, FeedbackComponent,ReactiveFormsModule],
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  trainingForm: FormGroup; // Define the form group
  private apiUrl = 'http://localhost:5000/api/training'; // API URL

  constructor(private router: Router, private http: HttpClient, private fb: FormBuilder) {
    // Initialize the form with FormBuilder
    this.trainingForm = this.fb.group({
      campus: ['', Validators.required],
      stream: ['', Validators.required],
      venue: ['', Validators.required],
      trainerName: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  submitTraining() {
    if (this.trainingForm.valid) {
      // Call the backend API to submit training session data
      this.http.post(this.apiUrl, this.trainingForm.value).subscribe(
        response => {
          console.log('Training session submitted:', response);
          // Navigate to the "Upcoming" page after successful submission
          this.router.navigate(['/upcoming']);
        },
        error => {
          console.error('Error submitting training session:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
