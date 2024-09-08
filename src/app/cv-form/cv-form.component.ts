import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, AbstractControl, FormControl } from '@angular/forms';
import { TopnavComponent } from '../topnav/topnav.component';
import { jsPDF } from 'jspdf';  // Import jsPDF for PDF generation
import { CommonModule } from '@angular/common';
import { Footer1Component } from "../footer1/footer1.component";
import { FeedbackComponent } from "../feedback/feedback.component";

@Component({
  selector: 'app-cv-form',
  standalone: true,
  imports: [ReactiveFormsModule, TopnavComponent, FormsModule, CommonModule, Footer1Component, FeedbackComponent],
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.css']
})
export class CvFormComponent {
  cvForm: FormGroup;
  uploadedImageUrl: string | ArrayBuffer | null = null; // For storing uploaded image preview

  constructor(private fb: FormBuilder) {
    // Initialize the form
    this.cvForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      skills: this.fb.array([]),  // Initialize as empty FormArrays
      projects: this.fb.array([]),
      education: this.fb.array([]),
      languages: this.fb.array([]),
      socialMedia: this.fb.array([]),
      summary: ['', Validators.required],
    });
  }

  // Getter methods for form arrays
  get skills(): FormArray {
    return this.cvForm.get('skills') as FormArray;
  }
  
  get projects(): FormArray {
    return this.cvForm.get('projects') as FormArray;
  }
  
  get education(): FormArray {
    return this.cvForm.get('education') as FormArray;
  }
  
  get languages(): FormArray {
    return this.cvForm.get('languages') as FormArray;
  }
  
  get socialMedia(): FormArray {
    return this.cvForm.get('socialMedia') as FormArray;
  }
  getFormControl(control: AbstractControl): FormControl {
    return control as FormControl;
  }
  // Methods to add new form controls dynamically
  addSkill() {
    this.skills.push(this.fb.control('', Validators.required));
  }

  addProject() {
    this.projects.push(this.fb.control('', Validators.required));
  }

  addEducation() {
    this.education.push(this.fb.control('', Validators.required));
  }

  addLanguage() {
    this.languages.push(this.fb.control('', Validators.required));
  }

  addSocialMedia() {
    this.socialMedia.push(this.fb.control('', Validators.required));
  }

  // Handle image upload

  // Method to handle the image upload or editing action
  openImageEditor(): void {
    // Logic to open the image editor or file input dialog
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.uploadedImageUrl = e.target.result; // Set the uploaded image URL
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click(); // Programmatically click the file input to open the file dialog
  }

  // Download the CV as a PDF
  downloadPDF() {
    const doc = new jsPDF(); // Create a new jsPDF instance

    // Capture the form data
    const formData = this.cvForm.value;

    // Add text data to the PDF
    doc.text(`Name: ${formData.name}`, 10, 10);
    doc.text(`Email: ${formData.email}`, 10, 20);
    doc.text(`Phone: ${formData.phone}`, 10, 30);
    doc.text(`Summary: ${formData.summary}`, 10, 40);

    // Add Skills section
    doc.text('Skills:', 10, 50);
    formData.skills.forEach((skill: string, index: number) => {
      doc.text(`- ${skill}`, 10, 60 + index * 10);
    });

    // Optionally save the document directly
    doc.save('generated-cv.pdf'); // Downloads the PDF with the specified name
  }

  // Share the CV via WhatsApp
  shareWhatsApp() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://wa.me/?text=${url}`, '_blank');
  }

  // Share the CV via Gmail
  shareGmail() {
    const subject = encodeURIComponent('Check out this CV');
    const body = encodeURIComponent(`Here's my CV: ${window.location.href}`);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  }

  // Copy the CV link to the clipboard
  copyLink() {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  }
}
