import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { TopnavComponent } from '../topnav/topnav.component';

@Component({
  selector: 'app-upcoming',
  standalone:true,
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
    email: '',
    stream: 'CSE',
    mobile: '',
    campuses: {
      vizianagaram: false,
      bhubaneswar: false
    }
  };

  additionalCompanies: string[] = [];
  registrations: any[] = []; // Fetched data

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

  submitTraining(): void {
    const payload = { campusDrives: this.campusDrives };
    this.http.post('http://localhost:5000/api/registercampus', payload)
      .subscribe(
        (response) => console.log('Training session submitted:', response),
        (error: HttpErrorResponse) => console.error('Error submitting:', error)
      );
  }

  register(): void {
    this.http.post('http://localhost:5000/api/registercampus', this.registration)
      .subscribe(
        (response) => console.log('Registration successful:', response),
        (error: HttpErrorResponse) => console.error('Error registering:', error)
      );
  }
}