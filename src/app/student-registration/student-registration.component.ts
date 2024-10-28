import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Import HttpClient for making HTTP requests
import { TopnavComponent } from '../topnav/topnav.component';
import { FeedbackComponent } from "../feedback/feedback.component";
import { Footer1Component } from "../footer1/footer1.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-registration',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, TopnavComponent, HttpClientModule,FeedbackComponent, Footer1Component,CommonModule],
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.css']
})
export class StudentRegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  private apiUrl = 'http://localhost:5000/api/students'; // API URL for the backend

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {} // Inject HttpClient

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      fullName: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      address: [''],

      degree: ['', Validators.required],
      department: ['', Validators.required],
      college: ['', Validators.required],
      yearOfPassing: ['', Validators.required],
      percentage: ['', Validators.required],

      completedTrainings: [''],
      skills: [''],
      preferredTraining: [''],

      interestedInPlacement: [false],
      preferredJobRoles: [''],
      preferredLocation: [''],
      resume: [null],
      linkedin: [''],
      portfolio: [''],

      extracurricularActivities: [''],
      languagesKnown: [''],
      achievements: [''],
      additionalInformation: [''],

      declaration: [false, Validators.requiredTrue] // Ensure checkbox is checked
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      // Make a POST request to the backend
      this.http.post(this.apiUrl, this.registrationForm.value).subscribe(
        (response) => {
          console.log('Registration successful', response);
          this.router.navigate(['/cv-form']); // Navigate to the CV form page
        },
        (error) => {
          console.error('Error registering student:', error);
        }
      );
    } else {
      console.error('Form is not valid:');
      console.error('Form Errors:', this.registrationForm.errors);
  
      Object.keys(this.registrationForm.controls).forEach((key) => {
        const control = this.registrationForm.get(key);
        if (control && control.invalid) {
          console.error(`Control ${key} is invalid:`, control.errors);
        }
      });
    }
  }
}
