import { Component, Injectable, NgModule } from '@angular/core';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SidenavComponent } from "../sidenav/sidenav.component";
import { TopnavComponent } from "../topnav/topnav.component";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5000/api/registercampus';

  constructor(private http: HttpClient) { }

  submitTraining(trainingData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/submitTraining`, trainingData);
  }

  registerForCampusDrive(registrationData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, registrationData);
  }
}

@Component({
  selector: 'app-upcoming',
  standalone: true,
  imports: [SidenavComponent, TopnavComponent, FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
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

  additionalCompanies: string[] = []; // Initialize as an empty array

  constructor(private apiService: ApiService) {}

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
    // Call the service to submit training session details
    this.apiService.submitTraining(this.campusDrives).subscribe(
      (response) => console.log('Training session submitted:', response),
      (error) => console.error('Error submitting training session:', error)
    );
  }

  register() {
    // Call the service to register for a campus drive
    this.apiService.registerForCampusDrive(this.registration).subscribe(
      (response) => console.log('Registration successful:', response),
      (error) => console.error('Error registering:', error)
    );
  }

  logout() {
    // Logout logic here
  }
}
