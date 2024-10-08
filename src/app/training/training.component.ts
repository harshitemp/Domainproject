import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { SidenavComponent } from '../sidenav/sidenav.component';
import { Footer1Component } from "../footer1/footer1.component";
import { FeedbackComponent } from "../feedback/feedback.component";

@Component({
  selector: 'app-training',
  standalone:true,
  imports: [SidenavComponent, Footer1Component, FeedbackComponent],
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent {
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

  constructor(private router: Router) {} // Inject Router service

  submitTraining() {
    console.log('Training Session Data:', this.campusDrives);
    // Navigate to the "Upcoming" page
    this.router.navigate(['/upcoming']);
  }

  register() {
    console.log('Registration Data:', this.registration);
    // Navigate to the "Upcoming" page
    this.router.navigate(['/upcoming']);
  }
}
