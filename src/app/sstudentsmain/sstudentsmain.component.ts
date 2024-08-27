import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-sstudentsmain',
  standalone: true,
  imports: [],
  templateUrl: './sstudentsmain.component.html',
  styleUrl: './sstudentsmain.component.css'
})
export class SstudentsmainComponent  {
  jobs = [
    {
      studentName: 'Poojari Harshitha',
      jobTitle: 'Web developer',
      companyName: 'Google'
    }
    // Add more jobs as needed
  ];

  onMessagesClick() {
    console.log('Messages button clicked');
  }

  onLogoutClick() {
    console.log('Logout button clicked');
  }
}