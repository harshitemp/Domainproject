// login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeaderloginComponent } from '../headerlogin/headerlogin.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,  // Mark it as a standalone component
  imports: [
    CommonModule,    // Import necessary modules directly
    FormsModule,
    NavbarComponent, // Import other components if they are standalone
    LoginComponent,
    HeaderloginComponent,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  selectedForm: string | null = null;
  formData = {
    email: '',
    password: ''
  };

  // Method to show the appropriate form
  showForm(formType: string) {
    this.selectedForm = formType;
  }

  // Method to handle form submission
  onSubmit() {
    if (this.selectedForm) {
      console.log('Form submitted for ${this.selectedForm}');
      console.log(this.formData);
      // Reset form data after submission
      this.formData = { email: '', password: '' };
    }
  }
}