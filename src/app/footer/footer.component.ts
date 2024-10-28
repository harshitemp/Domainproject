import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  footerData: any; // Define a variable to store footer data

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getFooterData();
  }

  getFooterData() {
    this.http.get<any>('http://localhost:5000/api/footer').subscribe({
      next: (data) => {
        this.footerData = data;
      },
      error: (error) => {
        console.error('Error fetching footer data:', error);
      }
    });
  }
}
