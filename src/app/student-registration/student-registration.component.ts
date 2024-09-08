import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router
import { TopnavComponent } from '../topnav/topnav.component';
import { FeedbackComponent } from "../feedback/feedback.component";
import { Footer1Component } from "../footer1/footer1.component";

@Component({
  selector: 'app-student-registration',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, TopnavComponent, FeedbackComponent, Footer1Component],
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.css']
})
export class StudentRegistrationComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {} // Inject Router

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
      console.log('Form is valid, navigating to CV form...');
      this.router.navigate(['/cv-form']);
    } else {
      console.error('Form is not valid:');
      // Log form-level errors
      console.error('Form Errors:', this.registrationForm.errors);
  
      // Log individual control errors
      Object.keys(this.registrationForm.controls).forEach((key) => {
        const control = this.registrationForm.get(key);
        if (control && control.invalid) {
          console.error(`Control ${key} is invalid:`, control.errors);
        }
      });
    }
  }
  
}