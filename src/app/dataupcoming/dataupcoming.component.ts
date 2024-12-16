import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { TopnavallComponent } from "../topnavall/topnavall.component";

@Component({
  selector: 'app-dataupcoming',
  standalone: true,
  imports: [HttpClientModule, CommonModule, TopnavallComponent],
  templateUrl: './dataupcoming.component.html',
  styleUrl: './dataupcoming.component.css'
})
export class DataupcomingComponent {
  registrations: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchRegistrations();
  }

  fetchRegistrations(): void {
    this.http.get<any[]>('http://localhost:5000/api/registercampus').subscribe(
      (data) => {
        this.registrations = data;
      },
      (error) => {
        console.error('Error fetching registrations:', error);
      }
    );
  }

  downloadExcel(): void {
    const url = 'http://localhost:5000/api/downloadexcel';
    this.http.get(url, { responseType: 'blob' }).subscribe(
      (response: Blob) => {
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const downloadUrl = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = downloadUrl;
        anchor.download = 'CampusDrives.xlsx';
        anchor.click();
        window.URL.revokeObjectURL(downloadUrl);
      },
      (error: HttpErrorResponse) => {
        console.error('Error downloading Excel file:', error.message);
      }
    );
  }
}
