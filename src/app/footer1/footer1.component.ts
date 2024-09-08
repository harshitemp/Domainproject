import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer1',
  standalone:true,
  imports:[FormsModule,CommonModule],
  templateUrl: './footer1.component.html',
  styleUrls: ['./footer1.component.css']
})
export class Footer1Component {
  generalQuestions: string[] = ['What is the website about?', 'How to register for training?'];
  technicalQuestions: string[] = ['Explain the MVC architecture in Angular.', 'How does two-way data binding work in Angular?'];
  personalTechnicalQuestions: string[] = ['Describe a technical challenge you overcame in a project.', 'How do you approach debugging in your code?'];

  showAddQuestion = {
    general: false,
    technical: false,
    personalTechnical: false
  };

  newQuestion = {
    general: '',
    technical: '',
    personalTechnical: ''
  };

  toggleAddQuestion(category: 'general' | 'technical' | 'personalTechnical'): void {
    this.showAddQuestion[category] = !this.showAddQuestion[category];
  }

  addQuestion(category: 'general' | 'technical' | 'personalTechnical'): void {
    if (this.newQuestion[category].trim()) {
      if (category === 'general') {
        this.generalQuestions.push(this.newQuestion[category]);
      } else if (category === 'technical') {
        this.technicalQuestions.push(this.newQuestion[category]);
      } else if (category === 'personalTechnical') {
        this.personalTechnicalQuestions.push(this.newQuestion[category]);
      }
      this.newQuestion[category] = '';
      this.showAddQuestion[category] = false;
    }
  }
}