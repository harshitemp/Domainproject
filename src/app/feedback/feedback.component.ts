import { CommonModule } from '@angular/common';
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
  stars: string[] = ['Very Bad', 'Bad', 'Okay', 'Good', 'Excellent']; // Tooltip labels for stars
  rating: number = 0; // To store the selected rating
  feedback: string = ''; // To store the feedback text

  // Function to handle the rating click
  rate(index: number): void {
    console.log('Rating clicked:', index);
    this.rating = index;
  }

  // Function to handle form submission
  onSubmit(): void {
    // Collect feedback data and log or send it to the backend
    const feedbackData = {
      rating: this.rating,
      feedback: this.feedback,
    };

    // Here, you would typically send this data to a server via an HTTP request.
    console.log('Feedback submitted:', feedbackData);

    // Reset form after submission
    this.resetForm();
  }

  // Reset the form fields
  resetForm(): void {
    this.rating = 0;
    this.feedback = '';
  }
}
