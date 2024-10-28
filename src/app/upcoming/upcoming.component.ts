import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { SidenavComponent } from "../sidenav/sidenav.component";
import { TopnavComponent } from "../topnav/topnav.component";

@Component({
  selector: 'app-upcoming',
  standalone: true,
  imports: [SidenavComponent, TopnavComponent, HttpClientModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent {
  campusDrives: { [key: string]: boolean } = {
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

  additionalCompanies: string[] = [];

  constructor(private http: HttpClient) {}

  addCompany(): void {
    const newCompany = prompt('Enter the company name:');
    if (newCompany) {
      const companyName = newCompany.toLowerCase();
      if (!this.additionalCompanies.includes(companyName)) {
        this.additionalCompanies.push(companyName);
        this.campusDrives[companyName] = false;
      } else {
        alert('Company already added.');
      }
    }
  }

  submitTraining() {
    const payload = { campusDrives: this.campusDrives };

    // Use HTTP instead of HTTPS
    this.http.post('http://localhost:5000/api/registercampus', payload)
      .subscribe(
        (response) => console.log('Training session submitted:', response),
        (error: HttpErrorResponse) => {
          console.error('Error submitting training session:', error);
          if (error.status === 0) {
            alert('Network error: Please check your connection.');
          } else {
            alert(`Error ${error.status}: Unable to submit the training session. Please try again.`);
          }
        }
      );
  }

  register() {
    // Use HTTP instead of HTTPS
    this.http.post('http://localhost:5000/api/registercampus', this.registration)
      .subscribe(
        (response) => console.log('Registration successful:', response),
        (error: HttpErrorResponse) => {
          console.error('Error registering:', error);
          if (error.status === 0) {
            alert('Network error: Please check your connection.');
          } else {
            alert(`Error ${error.status}: Registration failed. Please try again.`);
          }
        }
      );
  }

  logout() {
    // Logout logic here
  }
}
