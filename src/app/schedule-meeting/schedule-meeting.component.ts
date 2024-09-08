import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { TopnavallComponent } from "../topnavall/topnavall.component";

@Component({
  selector: 'app-schedule-meeting',
  standalone: true,
  imports: [FormsModule, SidebarComponent, TopnavallComponent],
  templateUrl: './schedule-meeting.component.html',
  styleUrl: './schedule-meeting.component.css'
})
export class ScheduleMeetingComponent {
meetingDate: any;
scheduleMeeting() {
throw new Error('Method not implemented.');
}

}
