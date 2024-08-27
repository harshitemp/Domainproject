import { Component } from '@angular/core';
import { SafePipe } from '../safe.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { FileSaverService } from 'ngx-filesaver';
import { TopnavComponent } from '../topnav/topnav.component';

@Component({
  selector: 'app-pdf-view',
  standalone: true,
  imports: [SafePipe,TopnavComponent],
  templateUrl: './pdf-view.component.html',
  styleUrl: './pdf-view.component.css'
})
export class PdfViewComponent {

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
  
    pdfSrc: any;

  constructor(private sanitizer: DomSanitizer, private fileSaverService: FileSaverService) {
    const state = window.history.state;
    const pdfBlob = state.pdfBlob;

    if (pdfBlob) {
      const pdfUrl = URL.createObjectURL(pdfBlob);
      this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
    }
  }

  downloadPDF() {
    const state = window.history.state;
    const pdfBlob = state.pdfBlob;
    this.fileSaverService.save(pdfBlob, 'generated.pdf');
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