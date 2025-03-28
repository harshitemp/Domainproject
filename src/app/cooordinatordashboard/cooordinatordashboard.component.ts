import { Component } from '@angular/core';
import { DataupcomingComponent } from "../dataupcoming/dataupcoming.component";
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopnavforallComponent } from '../topnavforall/topnavforall.component';

@Component({
  selector: 'app-cooordinatordashboard',
  standalone: true,
  imports: [DataupcomingComponent,SidebarComponent,TopnavforallComponent],
  templateUrl: './cooordinatordashboard.component.html',
  styleUrl: './cooordinatordashboard.component.css'
})
export class CooordinatordashboardComponent {

}
