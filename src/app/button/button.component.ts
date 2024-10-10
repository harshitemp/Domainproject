import { Component } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  contactUs() {
    console.log("Contact button clicked");
    alert("Contact us at: Vizianagaram Campus Tekkali Village, Nelimarla Mandal, Vizianagaram Pin: 535003, Andhra Pradesh, India. www.cutmap.ac.in");
  }
}
