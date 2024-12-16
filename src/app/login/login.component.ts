import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    HttpClientModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  selectedForm: string | undefined; // Variable to track the selected user type
  formData = { email: '', password: '' }; // Initialize form data

  constructor(private http: HttpClient, private router: Router) {}

  showForm(formType: string) {
    this.selectedForm = formType; // Set the selected form type
  }

  onSubmit(form: NgForm) {
    if (this.selectedForm) {
      if (form.valid) { // Ensure the form is valid
        const loginData = {
          email: this.formData.email,
          password: this.formData.password,
          userType: this.selectedForm // Include the user type in the login data
        };

        // Send login data to the backend
        this.http.post('http://localhost:5000/api/login', loginData) // Ensure this URL matches your backend
          .subscribe({
            next: (response) => {
              console.log('Login successful', response);

              // Navigate based on the selected user type
              switch (this.selectedForm) {
                case 'student':
                  this.router.navigate(['/student-registration']);
                  break;
                case 'university':
                  this.router.navigate(['/pursuitmanager']);
                  break;
                case 'company':
                  this.router.navigate(['/training']);
                  break;
                case 'coordinators':
                  this.router.navigate(['/view-placement']);
                  break;
                default:
                  console.warn('Unknown user type:', this.selectedForm);
              }
            },
            error: (error) => {
              console.error('Login failed', error);
              // Handle specific error responses
              if (error.status === 404) {
                alert('Error: Endpoint not found. Please verify the server and endpoint URL.');
              } else {
                alert('Login failed: ' + (error.error?.message || 'An error occurred. Please try again.'));
              }
            }
          });

        // Optionally reset formData after submission
        this.formData = { email: '', password: '' };
        form.resetForm(); // Reset the form after submission
      } else {
        alert('Please fill in all required fields.'); // Alert if the form is invalid
      }
    } else {
      alert('Please select a user type.'); // Alert if no user type is selected
    }
  }
}
