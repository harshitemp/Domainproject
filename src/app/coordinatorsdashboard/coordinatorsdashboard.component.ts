import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { TopnavallComponent } from "../topnavall/topnavall.component";

@Component({
  selector: 'app-coordinatorsdashboard',
  standalone: true,
  imports: [SidebarComponent, TopnavallComponent],
  templateUrl: './coordinatorsdashboard.component.html',
  styleUrl: './coordinatorsdashboard.component.css'
})
export class CoordinatorsdashboardComponent {

}
