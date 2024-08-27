import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  contactUs() {
    alert("Contact us at: Vizianagaram Campus Tekkali Village, Nelimarla Mandal, Vizianagaram Pin: 535003, Andhra Pradesh, India. www.cutmap.ac.in");
  }
}
