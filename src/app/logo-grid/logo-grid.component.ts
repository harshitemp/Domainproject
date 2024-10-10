import { Component } from '@angular/core';
import { PlacedStudentsComponent } from "../placed-students/placed-students.component";

@Component({
  selector: 'app-logo-grid',
  standalone: true,
  imports: [PlacedStudentsComponent],
  templateUrl: './logo-grid.component.html',
  styleUrl: './logo-grid.component.css'
})
export class LogoGridComponent {

}
