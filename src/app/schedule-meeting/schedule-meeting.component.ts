import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { TopnavallComponent } from "../topnavall/topnavall.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-schedule-meeting',
  standalone: true,
  imports: [FormsModule, SidebarComponent, TopnavallComponent],
  templateUrl: './schedule-meeting.component.html',
  styleUrl: './schedule-meeting.component.css'
})
export class ScheduleMeetingComponent {
 
  

    meetingDate: string = '';
  
    constructor(private http: HttpClient) {}
  
    scheduleMeeting() {
      if (!this.meetingDate) {
        alert('Please select a date for the meeting');
        return;
      }
  
      const meetingData = {
        meetingDate: this.meetingDate
      };
  
      this.http.post('http://localhost:5000/api/meeting', meetingData)
        .subscribe(
          (response: any) => {
            console.log('Meeting scheduled successfully', response);
            alert('Meeting scheduled successfully');
          },
          (error) => {
            console.error('Error scheduling meeting', error);
            alert('Error scheduling meeting');
          }
        );
  
      // Clear the input after scheduling
      this.meetingDate = '';
    }
  }
  
