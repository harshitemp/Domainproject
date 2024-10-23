import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';


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

  constructor(private http: HttpClient, private router: Router) {}

  showForm(formType: string) {
    this.selectedForm = formType;
  }

  onSubmit() {
    if (this.selectedForm) {
      const userType = this.selectedForm;
      const data = {
        email: this.formData.email,
        password: this.formData.password,
        userType: userType
      };

      this.http.post('http://localhost:5000/api/register', data)
        .subscribe(
          (response: any) => {
            console.log('User registered successfully', response);
            this.router.navigate([`/${userType}`]);
          },
          (error) => {
            console.error('Error registering user', error);
          }
        );

      this.formData = { email: '', password: '' };
    }
  }
}
