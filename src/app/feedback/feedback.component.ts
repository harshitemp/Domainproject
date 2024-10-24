import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  standalone:true,
  imports:[FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
 
  stars: string[] = ['Very Bad', 'Bad', 'Okay', 'Good', 'Excellent'];
  rating: number = 0;
  feedback: string = '';
  email: string = ''; // Add an email field

  constructor(private http: HttpClient) {}

  rate(index: number): void {
    this.rating = index;
  }

  onSubmit(): void {
    const feedbackData = {
      rating: this.rating,
      feedback: this.feedback,
      email: this.email // Collect email from a form field
    };

    // Send data to the backend
    this.http.post('http://localhost:5000/api/feedback', feedbackData)
      .subscribe(response => {
        console.log('Feedback submitted:', response);
        alert('Thank you for your feedback!');
        this.resetForm();
      }, error => {
        console.error('Error submitting feedback', error);
        alert('Failed to submit feedback');
      });
  }

  resetForm(): void {
    this.rating = 0;
    this.feedback = '';
    this.email = ''; // Reset email as well
  }
}
