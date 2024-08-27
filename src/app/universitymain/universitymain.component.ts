import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-universitymain',
  standalone: true,
  imports: [RouterLink, FormsModule, NavbarComponent],
  templateUrl: './universitymain.component.html',
  styleUrl: './universitymain.component.css'
})
export class UniversitymainComponent {
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