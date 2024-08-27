import { Component } from '@angular/core';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent {
  jobs = [
    {
      name: 'Sam Hill',
      description: 'Pharetra Sed Hendrerit Foundation',
      details: 'Innovating AI recruiting tools and on-demand hiring help. Tap into the largest network of recruiters nationwide. Recruit talent faster and build',
      logo: 'assets/drapcode-logo.png' // Replace with the correct path to the image
    },
    {
      name: 'John Doe',
      description: 'Another Company',
      details: 'Innovating AI recruiting tools and on-demand hiring help. Tap into the largest network of recruiters nationwide. Recruit talent faster and build',
      logo: 'assets/drapcode-logo.png' // Replace with the correct path to the image
    }
  ];
}
