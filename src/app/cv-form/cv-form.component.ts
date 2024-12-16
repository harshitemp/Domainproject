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
  http: any;

  constructor(private fb: FormBuilder) {
    this.cvForm = this.fb.group({
      name: ['',Validators.required],
        technical: [''],
        laboratory: [''],
        bioinformatic: [''],
      projects: this.fb.array([]),
      domainExpertise: [''],
      education: this.fb.array([]),
      objective: [''],
      email: ['',[Validators.required,Validators.email]],
      phone: ['',Validators.required],
      linkedin: [''],
      github: [''],
      internship: [''],
      achievements: this.fb.array([]),
      interests: ['']
    });
  }

  get projects(): FormArray {
    return this.cvForm.get('projects') as FormArray;
  }

  get education(): FormArray {
    return this.cvForm.get('education') as FormArray;
  }

  get achievements(): FormArray {
    return this.cvForm.get('achievements') as FormArray;
  }

  addField(array: FormArray) {
    array.push(this.fb.control(''));
  }

  removeField(array: FormArray, index: number) {
    array.removeAt(index);
  }

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

  
  downloadPDF() {
    const doc = new jsPDF();
    const formData = this.cvForm.value;
    const pageHeight = doc.internal.pageSize.height;
    let yPosition = 20;  // Starting Y position for text

    // Set font sizes and colors
    const headerFontSize = 20;
    const sectionFontSize = 16;
    const textFontSize = 12;
    const headerColor = [230, 184, 0];  // Adjusted yellow
    const sectionColor = [120, 113, 50];  // Darker color for sections
    const textColor = [0, 0, 0];

    // Utility function to check for page break
    const checkPageBreak = (yPosition: number) => {
        if (yPosition > pageHeight - 20) {  // Add a new page if close to the bottom
            doc.addPage();
            return 20; // Reset y position for the new page
        }
        return yPosition;
    };

    // Header Section - Name
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(headerFontSize);
    doc.setTextColor(230, 184, 0);
    doc.text(formData.name || "", 20, yPosition);

    // Left Column - Skills
    yPosition += 20;
    yPosition = checkPageBreak(yPosition);
    doc.setFontSize(sectionFontSize);
    doc.setTextColor(120, 113, 50);
    doc.text("SKILLS", 20, yPosition);

    yPosition += 10;
    yPosition = checkPageBreak(yPosition);
    doc.setFontSize(textFontSize);
    doc.setTextColor(0,0,0);
    doc.text(`Technical: ${formData.skills?.technical || ''}`, 25, yPosition);

    // Left Column - Projects
    yPosition += 20;
    yPosition = checkPageBreak(yPosition);
    doc.setFontSize(sectionFontSize);
    doc.setTextColor(120, 113, 50);
    doc.text("PROJECT UNDERTAKEN", 20, yPosition);

    yPosition += 10;
    doc.setFontSize(textFontSize);
    doc.setTextColor(0,0,0);

    formData.projects.forEach((project: any, index: any) => {
        yPosition += 10;
        yPosition = checkPageBreak(yPosition);
        const projectLines = doc.splitTextToSize(`• ${project}`, 80); // Wrap text for each project
        projectLines.forEach((line: string | string[]) => {
            doc.text(line, 25, yPosition);
            yPosition += 8; // Small line spacing for wrapped text
            yPosition = checkPageBreak(yPosition);
        });
    });

    // Left Column - Education
    yPosition += 20;
    yPosition = checkPageBreak(yPosition);
    doc.setFontSize(sectionFontSize);
    doc.setTextColor(120, 113, 50);
    doc.text("EDUCATION", 20, yPosition);

    yPosition += 10;
    doc.setFontSize(textFontSize);
    doc.setTextColor(0,0,0);
    formData.education.forEach((edu: any) => {
        yPosition += 10;
        yPosition = checkPageBreak(yPosition);
        const eduLines = doc.splitTextToSize(`• ${edu}`, 80); // Wrap text for each education entry
        eduLines.forEach((line: string | string[]) => {
            doc.text(line, 25, yPosition);
            yPosition += 8;
            yPosition = checkPageBreak(yPosition);
        });
    });

    // Left Column - Objective
    yPosition += 20;
    yPosition = checkPageBreak(yPosition);
    doc.setFontSize(sectionFontSize);
    doc.setTextColor(120, 113, 50);
    doc.text("OBJECTIVE", 20, yPosition);

    yPosition += 10;
    doc.setFontSize(textFontSize);
    doc.setTextColor(0,0,0);
    const objectiveLines = doc.splitTextToSize(formData.objective || "", 80); // Wrap text for objective
    objectiveLines.forEach((line: string | string[]) => {
        doc.text(line, 25, yPosition);
        yPosition += 8;
        yPosition = checkPageBreak(yPosition);
    });

    // Right Column - Contact Info
    let xPosition = 110;
    yPosition = 70; // Reset y-position for the right column
    yPosition = checkPageBreak(yPosition);
    doc.setFontSize(sectionFontSize);
    doc.setTextColor(120, 113, 50);
    doc.text("CONTACT INFORMATION", xPosition, yPosition);

    yPosition += 10;
    doc.setFontSize(textFontSize);
    doc.setTextColor(0,0,0);
    doc.text(`Email: ${formData.email || ""}`, xPosition, yPosition);
    yPosition += 10;
    doc.text(`Phone: ${formData.phone || ""}`, xPosition, yPosition);
    yPosition += 10;
    doc.text(`LinkedIn: ${formData.linkedin || ""}`, xPosition, yPosition);
    yPosition += 10;
    doc.text(`GitHub: ${formData.github || ""}`, xPosition, yPosition);

    // Right Column - Internship
    yPosition += 20;
    yPosition = checkPageBreak(yPosition);
    doc.setFontSize(sectionFontSize);
    doc.setTextColor(120, 113, 50);
    doc.text("INTERNSHIP", xPosition, yPosition);

    yPosition += 10;
    yPosition = checkPageBreak(yPosition);
    doc.setFontSize(textFontSize);
    doc.setTextColor(0,0,0);
    const internshipLines = doc.splitTextToSize(formData.internship || "", 80); // Wrap text for internship
    internshipLines.forEach((line: string | string[]) => {
        doc.text(line, xPosition, yPosition);
        yPosition += 8;
        yPosition = checkPageBreak(yPosition);
    });

    // Right Column - Achievements
    yPosition += 20;
    yPosition = checkPageBreak(yPosition);
    doc.setFontSize(sectionFontSize);
    doc.setTextColor(0,0,0);
    doc.text("ACHIEVEMENT / CERTIFICATIONS", xPosition, yPosition);

    formData.achievements.forEach((achievement: any) => {
        yPosition += 10;
        yPosition = checkPageBreak(yPosition);
        const achievementLines = doc.splitTextToSize(`• ${achievement}`, 80); // Wrap text for each achievement
        achievementLines.forEach((line: string | string[]) => {
            doc.text(line, xPosition, yPosition);
            yPosition += 8;
            yPosition = checkPageBreak(yPosition);
        });
    });

    // Right Column - Interests
    yPosition += 20;
    yPosition = checkPageBreak(yPosition);
    doc.setFontSize(sectionFontSize);
    doc.setTextColor(120, 113, 50);
    doc.text("INTERESTS", xPosition, yPosition);

    yPosition += 10;
    doc.setFontSize(textFontSize);
    doc.setTextColor(0,0,0);
    const interestsLines = doc.splitTextToSize(formData.interests || "", 80); // Wrap text for interests
    interestsLines.forEach((line: string | string[]) => {
        doc.text(line, xPosition, yPosition);
        yPosition += 8;
        yPosition = checkPageBreak(yPosition);
    });

    // Embed the uploaded image if available
    if (this.uploadedImageUrl) {
        yPosition = checkPageBreak(yPosition + 50); // Make space for the image
        doc.addImage(this.uploadedImageUrl as string, "JPEG", xPosition + 25, 20, 40, 40);  // Adjust position to fit layout
    }

    // Download the PDF
    doc.save('generated-cv.pdf');
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
  onSubmit() {
    if (this.cvForm.valid) {
      this.http.post('http://localhost:5000/api/upload', this.cvForm.value)
        .subscribe({
          next: (response: any) => {  // Define response type as 'any' or a specific type if known
            alert('CV saved successfully!');
            console.log(response);
          },
          error: (error: any) => {  // Define error type as 'any' or a specific type if known
            console.error('Error saving CV', error);
            alert('Failed to save CV. Please try again.');
          }
        });
    } else {
      alert('Please fill out the form correctly.');
    }
  }
  
}