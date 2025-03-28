import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent, RouterLink, HttpClientModule], // Add CommonModule here
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  selectedForm: string | null = null; // Track selected form type
  formData = {
    email: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) { }

  // Method to show the correct form based on user selection
  showForm(formType: string) {
    this.selectedForm = formType;
  }

  // Method to handle form submission
  onSubmit() {
    if (this.selectedForm) {
      const userType = this.selectedForm; // Capture the selected form type (user type)
      const data = {
        email: this.formData.email,
        password: this.formData.password,
        userType: userType
      };

      // HTTP POST request to submit registration data
      this.http.post('http://localhost:5000/api/register', data).subscribe(
        (response: any) => {
          console.log('User registered successfully', response);
      
          // Ensure correct navigation
          switch (userType) {
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
              this.router.navigate(['/coordinatordashboard']);
              break;
            default:
              console.error('Unknown user type:', userType);
          }
        },
        (error) => {
          console.error('Error registering user', error);
        }
      );
      
      // Reset the form data after submission
      this.formData = { email: '', password: '' };
    }
  }
}
