import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TopnavallComponent } from "../topnavall/topnavall.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-display-responses',
  standalone:true,
  imports: [HttpClientModule, CommonModule, TopnavallComponent,FormsModule],
  templateUrl: './display-responses.component.html',
  styleUrls: ['./display-responses.component.css']
})
export class DisplayResponsesComponent implements OnInit {
  responses: any[] = [];
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchResponses();
  }

  fetchResponses(): void {
    this.http.get('http://localhost:5000/api/get-google-form-responses')
      .subscribe({
        next: (data: any) => this.responses = data,
        error: () => this.errorMessage = 'Failed to load responses',
      });
  }

  submitSelection(): void {
    // Filter selected users
    const selectedUsers = this.responses.filter(response => response.selected);

    if (selectedUsers.length === 0) {
      alert('Please select at least one user.');
      return;
    }

    // Send selected users to the backend for email processing
    this.http.post('http://localhost:5000/api/send-selection-emails', { users: selectedUsers })
      .subscribe({
        next: () => alert('Emails sent successfully to selected users!'),
        error: () => alert('Failed to send emails. Please try again.'),
      });
  }
}