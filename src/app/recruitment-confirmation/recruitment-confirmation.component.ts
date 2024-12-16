import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recruitment-confirmation',
  standalone:true,
  imports: [],
  templateUrl: './recruitment-confirmation.component.html',
  styleUrls: ['./recruitment-confirmation.component.css']
})
export class RecruitmentConfirmationComponent implements OnInit {
  confirmationMessage: string;

  constructor(private route: ActivatedRoute) {
    this.confirmationMessage = 'You have successfully registered for the recruitment.';
  }

  ngOnInit(): void {
    // Optionally, you can also use the recruitment ID to fetch more details about the recruitment
    const recruitmentId = this.route.snapshot.paramMap.get('id');
    console.log('Recruitment ID:', recruitmentId);
  }
}
