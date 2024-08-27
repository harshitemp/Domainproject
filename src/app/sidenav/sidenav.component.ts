import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone:true,
  imports:[RouterLink],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  sidenavWidth: string = '0';

  constructor(private router: Router) {}

  openNav() {
    console.log('openNav method called'); // Debugging
    this.sidenavWidth = '250px'; // Adjust to your desired width
  }

  closeNav() {
    console.log('closeNav method called'); // Debugging
    this.sidenavWidth = '0';
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.closeNav(); // Close the sidebar after navigation
  }
  logout() {
    // Implement your logout logic here
    console.log('Logout button clicked');

    // Redirect to home page
    this.router.navigate(['/home']);
  }
}

