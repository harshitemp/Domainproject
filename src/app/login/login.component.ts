// login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeaderloginComponent } from '../headerlogin/headerlogin.component';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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
  selectedForm: string | undefined;
  formData: any;


  constructor(private http: HttpClient) {}

  showForm(formType: string) {
    this.selectedForm = formType;
  }

  onSubmit() {
    if (this.selectedForm) {
      const loginData = {
        email: this.formData.email,
        password: this.formData.password,
        userType: this.selectedForm
      };

      this.http.post('http://localhost:5000/api/users/login', loginData)
        .subscribe(response => {
          console.log('Login successful', response);
          // Perform routing based on userType or show a success message
        }, error => {
          console.error('Login failed', error);
          // Show an error message to the user
        });

      this.formData = { email: '', password: '' };
    }
  }
}
