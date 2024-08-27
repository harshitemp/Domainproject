import { Component } from '@angular/core';
import { SidenavComponent } from "../sidenav/sidenav.component";

@Component({
  selector: 'app-upcoming',
  standalone: true,
  imports: [SidenavComponent,],
  templateUrl: './upcoming.component.html',
  styleUrl: './upcoming.component.css'
})
export class UpcomingComponent {
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