import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { SidenavComponent } from "../sidenav/sidenav.component";
import { TopnavComponent } from "../topnav/topnav.component";

@Component({
  selector: 'app-upcoming',
  standalone: true,
  imports: [SidenavComponent, TopnavComponent, FormsModule, ReactiveFormsModule, CommonModule],
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
  logout() {
    // Logout logic here
  }

  submitTraining() {
    // Submit training session details logic here
    console.log(this.campusDrives);
  }

  register() {
    // Register for campus drive logic here
    console.log(this.registration);
  }

}