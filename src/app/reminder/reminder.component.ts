import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { TopnavallComponent } from "../topnavall/topnavall.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reminder',
  standalone: true,
  imports: [FormsModule, SidebarComponent, TopnavallComponent],
  templateUrl: './reminder.component.html',
  styleUrl: './reminder.component.css'
})
export class ReminderComponent {

    studentId: string = '';
    reminderMessage: string = '';
    reminderType: string = '';
  
    constructor(private http: HttpClient) {}
  
    sendReminder() {
      const reminderData = {
        studentId: this.studentId,
        reminderMessage: this.reminderMessage,
        reminderType: this.reminderType
      };
  
      this.http.post('http://localhost:5000/api/reminder', reminderData)
        .subscribe(response => {
          console.log('Reminder sent successfully', response);
          alert('Reminder sent successfully!');
        }, error => {
          console.error('Error sending reminder', error);
          alert('Error sending reminder');
        });
  
      // Clear form fields after sending the reminder
      this.studentId = '';
      this.reminderMessage = '';
      this.reminderType = '';
    }
  }
  