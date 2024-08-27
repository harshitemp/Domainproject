import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent,RouterLink], // Add CommonModule here
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
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