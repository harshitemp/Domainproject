import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TopnavallComponent } from "../topnavall/topnavall.component";
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dataupcoming',
  standalone: true,
  imports: [HttpClientModule, CommonModule, TopnavallComponent],
  templateUrl: './dataupcoming.component.html',
  styleUrl: './dataupcoming.component.css'
})
export class DataupcomingComponent implements OnInit {
  registrations: any[] = [];
  pieChart: any;
  barChart: any;

  constructor(private http: HttpClient) {
    // Register all components of Chart.js
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.fetchRegistrations();
  }

  fetchRegistrations(): void {
    this.http.get<any[]>('http://localhost:5000/api/registercampus').subscribe(
      (data) => {
        this.registrations = data;
        this.generatePieChart();
        this.generateBarChart();  // Call the bar chart generation method
      },
      (error) => {
        console.error('Error fetching registrations:', error);
      }
    );
  }

  generatePieChart(): void {
    const canvas = document.getElementById('campusPieChart') as HTMLCanvasElement | null;

    if (!canvas) {
      console.error('Canvas element not found!');
      return;
    }

    const counts = {
      vizianagaram: this.registrations.filter(reg => reg.campuses?.vizianagaram).length,
      bhubaneswar: this.registrations.filter(reg => reg.campuses?.bhubaneswar).length,
      parlakemundi: this.registrations.filter(reg => reg.campuses?.parlakemundi).length,
      rayagada: this.registrations.filter(reg => reg.campuses?.rayagada).length,
      balasore: this.registrations.filter(reg => reg.campuses?.balasore).length,
      chatrapur: this.registrations.filter(reg => reg.campuses?.chatrapur).length
    };

    const labels = Object.keys(counts);
    const data = Object.values(counts);

    if (this.pieChart) {
      // Update existing chart
      this.pieChart.data.labels = labels;
      this.pieChart.data.datasets[0].data = data;
      this.pieChart.update();
    } else {
      // Create new chart
      this.pieChart = new Chart(canvas, {
        type: 'pie',
        data: {
          labels,
          datasets: [
            {
              data,
              backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545', '#6c757d', '#17a2b8'],
              hoverBackgroundColor: ['#0056b3', '#1e7e34', '#e0a800', '#c82333', '#5a6268', '#138496']
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            }
          }
        }
      });
    }
  }

  generateBarChart(): void {
    const canvas = document.getElementById('streamBarChart') as HTMLCanvasElement | null;

    if (!canvas) {
      console.error('Canvas element for Bar Chart not found!');
      return;
    }

    // Group registrations by stream
    const streamCounts = this.registrations.reduce((acc, reg) => {
      const stream = reg.stream || 'Unknown';
      acc[stream] = (acc[stream] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(streamCounts);
    const data = Object.values(streamCounts);

    if (this.barChart) {
      // Update existing bar chart
      this.barChart.data.labels = labels;
      this.barChart.data.datasets[0].data = data;
      this.barChart.update();
    } else {
      // Create new bar chart
      this.barChart = new Chart(canvas, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'Number of Registrations',
              data,
              backgroundColor: '#007bff',
              borderColor: '#0056b3',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
    }
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
      (error) => {
        console.error('Error downloading Excel file:', error.message);
      }
    );
  }
}
