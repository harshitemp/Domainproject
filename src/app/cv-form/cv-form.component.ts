import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { FormsModule } from '@angular/forms';
import { TopnavComponent } from '../topnav/topnav.component';
import { DomSanitizer } from '@angular/platform-browser';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-form',
  standalone:true,
  imports:[SidenavComponent,FormsModule,TopnavComponent],
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.css']
})
export class CvFormComponent {
  cv = {
    name: '',
    email: '',
    phone: '',
    address: '',
    education: '',
    experience: '',
    skills: '',
    summary: '',
    languages: ''
  };

  onSubmit() {
    console.log(this.cv); // Debugging to check if the data is captured correctly
  }

  downloadPDF() {
    const doc = new jsPDF();

    doc.text("Generated CV", 10, 10);
    doc.text(`Name: ${this.cv.name}`, 10, 20);
    doc.text(`Email: ${this.cv.email}`, 10, 30);
    doc.text(`Phone: ${this.cv.phone}`, 10, 40);
    doc.text(`Address: ${this.cv.address}`, 10, 50);
    doc.text(`Education: ${this.cv.education}`, 10, 60);
    doc.text(`Experience: ${this.cv.experience}`, 10, 70);
    doc.text(`Skills: ${this.cv.skills}`, 10, 80);
    doc.text(`Summary: ${this.cv.summary}`, 10, 90);
    doc.text(`Languages: ${this.cv.languages}`, 10, 100);

    doc.save('Generated_CV.pdf');
  }

  shareWhatsApp() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://wa.me/?text=${url}`, '_blank');
  }

  shareGmail() {
    const subject = encodeURIComponent('Check out this PDF');
    const body = encodeURIComponent(`Here's a PDF I generated: ${window.location.href}`);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  }

  copyLink() {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  }
}
