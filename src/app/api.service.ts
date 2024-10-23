// src/app/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',  // This makes the service available throughout the app
})
export class ApiService {
  sendContactData(formData: any) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:5000/api/handleRequest'; // Your API endpoint

  constructor(private http: HttpClient) {}

  handleRequest(action: string, data: any): Observable<any> {
    return this.http.post(this.apiUrl, { action, data });
  }
}
