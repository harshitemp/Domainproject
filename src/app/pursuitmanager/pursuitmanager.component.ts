import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TopnavallComponent } from "../topnavall/topnavall.component";
import { FeedbackComponent } from "../feedback/feedback.component";
import { Footer1Component } from "../footer1/footer1.component";

@Component({
  selector: 'app-pursuitmanager',
  standalone: true,
  templateUrl: './pursuitmanager.component.html',
  styleUrls: ['./pursuitmanager.component.css'],
  imports: [TopnavallComponent, FeedbackComponent, Footer1Component],
})
export class PursuitmanagerComponent implements OnInit {

  recruitmentForm: FormGroup;
  isDateSelected: boolean = true; // Default to showing date input
  selectedDate: string = '';
  weekSelection: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
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

  onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const date = new Date(input.value);
    this.selectedDate = this.formatDate(date);
    this.recruitmentForm.get('recruitmentDates')?.setValue(this.selectedDate);
  }

  formatDate(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
