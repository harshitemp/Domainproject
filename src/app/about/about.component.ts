import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    document.getElementById("contactButton")!.addEventListener("click", function() {
      var contactDetails = document.getElementById("contactDetails");
      if (contactDetails!.style.display === "none") {
        contactDetails!.style.display = "block";
      } else {
        contactDetails!.style.display = "none";
      }
    });
  }
}
