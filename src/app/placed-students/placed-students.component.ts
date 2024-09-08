import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-placed-students',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './placed-students.component.html',
  styleUrls: ['./placed-students.component.css']
})
export class PlacedStudentsComponent {
  studentForm: FormGroup;
  students: any[] = []; // Array to store the list of students

  constructor(private fb: FormBuilder) {
    // Initialize the form with empty values
    this.studentForm = this.fb.group({
      name: [''],
      uid: [''],
      section: [''],
      company: [''],
      photo: [null]
    });
  }

  // Handle image file selection
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Update the form control with the image URL
        this.studentForm.patchValue({ photo: e.target.result });
        console.log('Selected image URL:', e.target.result); // Debugging
      };
      reader.readAsDataURL(file);
    }
  }

  // Method to add the student details to the array
  addStudent() {
    if (this.studentForm.valid) {
      // Create an object with the student details
      const student = {
        name: this.studentForm.value.name,
        uid: this.studentForm.value.uid,
        section: this.studentForm.value.section,
        company: this.studentForm.value.company,
        photoUrl: this.studentForm.value.photo
      };

      // Add the student object to the students array
      this.students.push(student);

      // Clear the form fields after adding
      this.studentForm.reset();
      console.log('Current students:', this.students); // Debugging
    } else {
      alert('Please fill out all fields correctly.');
    }
  }
}
