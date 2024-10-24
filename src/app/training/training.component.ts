import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { SidenavComponent } from '../sidenav/sidenav.component';
import { Footer1Component } from "../footer1/footer1.component";
import { FeedbackComponent } from "../feedback/feedback.component";

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [SidenavComponent, Footer1Component, FeedbackComponent],
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent {
  private apiUrl = 'http://localhost:5000/api/training'; // API URL

  campusDrives = {
    tcs: false,
    wipro: false,
    accenture: false
  };

  registration = {
    name: '',
    regNumber: '',
    stream: 'CSE',
    mobile: '',
    campuses: {
      vizianagaram: false,
      bhubaneswar: false
    }
  };

  constructor(private router: Router, private http: HttpClient) {} // Inject Router and HttpClient

  submitTraining() {
    // Call the backend API to submit training session data
    this.http.post(this.apiUrl, this.campusDrives).subscribe(
      response => {
        console.log('Training session submitted:', response);
        // Navigate to the "Upcoming" page after successful submission
        this.router.navigate(['/upcoming']);
      },
      error => {
        console.error('Error submitting training session:', error);
      }
    );
  }

  register() {
    console.log('Registration Data:', this.registration);
    // Navigate to the "Upcoming" page
    this.router.navigate(['/upcoming']);
  }
}
