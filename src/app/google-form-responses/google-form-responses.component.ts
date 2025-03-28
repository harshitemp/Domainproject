import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule,  } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TopnavComponent } from "../topnav/topnav.component";
import { FormsModule } from '@angular/forms';
import { TopnavallComponent } from '../topnavall/topnavall.component';

@Component({
  selector: 'app-google-form-responses',
  standalone:true,
  imports: [CommonModule, HttpClientModule,TopnavComponent,FormsModule],
  templateUrl: './google-form-responses.component.html',
  styleUrls: ['./google-form-responses.component.css']
})
export class GoogleFormResponsesComponent implements OnInit {
  responses: any[] = [];
  errorMessage: string = '';
  formData = {
    fullName: '',
    email: '',
    skills: '',
    cgpa: null,
    stream: '',
    subStream: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchResponses();
  }
  fetchResponses() {
    throw new Error('Method not implemented.');
  }

  

  submitForm(): void {
    this.http.post('http://localhost:5000/api/store-google-form-data', this.formData)
      .subscribe({
        next: (response: any) => {
          alert('Form submitted successfully!');
           // Refresh responses after submission
        },
        error: (err) => {
          alert('Error submitting form!');
          console.error('Error:', err);
        },
      });
  }
}