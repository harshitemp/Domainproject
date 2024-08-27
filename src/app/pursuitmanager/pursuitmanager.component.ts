import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router service

@Component({
  selector: 'app-pursuitmanager',
  standalone:true,
  templateUrl: './pursuitmanager.component.html',
  styleUrls: ['./pursuitmanager.component.css'],
})
export class PursuitmanagerComponent implements OnInit {
  
  recruitmentForm: FormGroup;
  isDateSelected: boolean = true; // Default to showing date input

  constructor(private fb: FormBuilder, private router: Router) { // Inject Router here
    this.recruitmentForm = this.fb.group({
      recruiterName: ['', Validators.required],
      recruitmentType: ['date', Validators.required],
      recruitmentDates: [''],
      recruitmentWeek: [''],
    });
  }

  ngOnInit(): void {
    this.toggleDateWeekSelection();
  }

  toggleDateWeekSelection(): void {
    const recruitmentType = this.recruitmentForm.get('recruitmentType')?.value;
    this.isDateSelected = recruitmentType === 'date';

    if (this.isDateSelected) {
      this.recruitmentForm.get('recruitmentDates')?.setValidators(Validators.required);
      this.recruitmentForm.get('recruitmentWeek')?.clearValidators();
    } else {
      this.recruitmentForm.get('recruitmentWeek')?.setValidators(Validators.required);
      this.recruitmentForm.get('recruitmentDates')?.clearValidators();
    }

    this.recruitmentForm.get('recruitmentDates')?.updateValueAndValidity();
    this.recruitmentForm.get('recruitmentWeek')?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.recruitmentForm.valid) {
      console.log('Form Submitted', this.recruitmentForm.value);
      // Handle form submission logic here
    }
  }

  logout() {
    // Perform any necessary logout operations here, such as clearing tokens or session data
    this.router.navigate(['/home']); // Redirect to the home page
  }
}
