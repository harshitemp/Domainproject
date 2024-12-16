import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { TopnavallComponent } from "../topnavall/topnavall.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TopnavforallComponent } from "../topnavforall/topnavforall.component";

@Component({
  selector: 'app-reminder',
  standalone: true,
  imports: [FormsModule, SidebarComponent, TopnavallComponent, HttpClientModule, TopnavforallComponent],
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css'] // Fixed typo from styleUrl to styleUrls
})
export class ReminderComponent {
  studentId: string = '';
  reminderMessage: string = '';
  reminderType: string = '';

  constructor(private http: HttpClient) {}

  sendReminder() {
    // Validate input
    if (!this.studentId || !this.reminderMessage || !this.reminderType) {
      alert('Please fill in all fields.');
      return;
    }
  
    const reminderData = {
      studentId: Number(this.studentId), // Convert to Number
      message: this.reminderMessage, // Change to message
      type: this.reminderType // Keep this as it is
    };
  
    console.log('Sending reminder data:', reminderData); // Logging for debugging
  
    this.http.post('http://localhost:5000/api/reminder', reminderData)
      .subscribe(
        response => {
          console.log('Reminder sent successfully', response);
          alert('Reminder sent successfully!');
        },
        error => {
          console.error('Error sending reminder', error);
          alert('Error sending reminder: ' + error.message); // Improved error handling
        }
      );
  
    // Clear form fields after sending the reminder
    this.studentId = '';
    this.reminderMessage = '';
    this.reminderType = '';
  }
}  