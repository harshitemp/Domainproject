import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header1',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header1.component.html',
  styleUrl: './header1.component.css'
})
export class Header1Component { 
  constructor(private router: Router) {}

logout() {
  // Perform any necessary logout operations here, such as clearing tokens or session data
  this.router.navigate(['/home']); // Redirect to the home page
}
}
