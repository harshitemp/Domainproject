// about.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-about',
  standalone:true,
  imports:[NavbarComponent,CommonModule,HttpClientModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 })),
      ]),
    ]),
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(50px)', opacity: 0 }),
        animate('1s ease-in-out', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
    ]),
  ],
})
export class AboutComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  aboutData: any = {};
  router: any;

  

  signup() {
    this.router.navigate(['/signup']); // Navigate to the signup page
  }
}
