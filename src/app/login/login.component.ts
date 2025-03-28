import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeaderloginComponent } from '../headerlogin/headerlogin.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    HeaderloginComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  selectedForm: string | undefined;
  formData: any = { email: '', password: '' };
  otp: string[] = ['', '', '', ''];
  otpSent: boolean = false;
  otpVerified: boolean = false;
  partialEmail: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  private baseUrl: string = 'http://localhost:5000/api';

  constructor(private http: HttpClient, private router: Router) {}

  showForm(formType: string): void {
    this.selectedForm = formType;
    this.resetForm();
  }

  resetForm(): void {
    this.formData = { email: '', password: '' };
    this.otp = ['', '', '', ''];
    this.otpSent = false;
    this.otpVerified = false;
    this.partialEmail = '';
    this.successMessage = '';
    this.errorMessage = '';
  }

  sendOtp(): void {
    if (this.validateEmail(this.formData.email)) {
      this.http.post(`${this.baseUrl}/sendotp`, { email: this.formData.email }).subscribe(
        (response: any) => {
          this.otpSent = true;
          this.partialEmail = `***${this.formData.email.slice(3)}`;
          this.successMessage = response.message || 'OTP sent successfully!';
          this.errorMessage = '';
        },
        (error) => {
          this.successMessage = '';
          this.errorMessage = error.error?.message || 'Error sending OTP.';
        }
      );
    } else {
      this.errorMessage = 'Invalid Email';
      this.successMessage = '';
    }
  }

  verifyOtp(): void {
    const otpValue = this.otp.join('');
    if (otpValue.length === 4) {
      this.http.post(`${this.baseUrl}/verifyotp`, { email: this.formData.email, otp: otpValue }).subscribe(
        (response: any) => {
          this.successMessage = response.message || 'OTP verified successfully!';
          this.errorMessage = '';
          this.otpVerified = true;
        },
        (error) => {
          this.successMessage = '';
          this.errorMessage = error.error?.message || 'Invalid OTP.';
        }
      );
    } else {
      this.errorMessage = 'Please enter a valid 4-digit OTP.';
    }
  }

  onSubmit(): void {
    if (this.otpVerified) {
      this.http.post(`${this.baseUrl}/login`, this.formData).subscribe(
        (response: any) => {
          alert('Login successful!');
          const redirectUrl = this.getRedirectUrl(this.selectedForm);
          this.router.navigate([redirectUrl]);
        },
        (error) => {
          alert('Login failed. Please check your credentials.');
        }
      );
    } else {
      alert('Please verify OTP before proceeding.');
    }
  }

  private getRedirectUrl(formType: string | undefined): string {
    switch (formType) {
      case 'student':
        return '/student-registration';
      case 'university':
        return '/pursuitmanager';
      case 'company':
        return '/training';
      case 'coordinators':
        return '/cooordinatordashboard';
      default:
        return '/';
    }
  }

  moveNext(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;
    if (event.key === 'Backspace' && index > 0) {
      this.otp[index] = '';
      (document.querySelectorAll('.form-control')[index - 1] as HTMLElement).focus();
    } else if (input.value && index < 3) {
      (document.querySelectorAll('.form-control')[index + 1] as HTMLElement).focus();
    }
  }

  private validateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}