import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

export interface Question {
  category: string;
  question: string;
}

@Component({
  selector: 'app-footer1',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './footer1.component.html',
  styleUrls: ['./footer1.component.css']
})
export class Footer1Component implements OnInit {
  generalQuestions: Question[] = [];
  technicalQuestions: Question[] = [];
  personalTechnicalQuestions: Question[] = [];

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

  private apiUrl = 'http://localhost:5000/api/footerq';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.http.get<Question[]>(this.apiUrl).subscribe({
      next: (questions) => {
        this.generalQuestions = questions.filter(q => q.category === 'general');
        this.technicalQuestions = questions.filter(q => q.category === 'technical');
        this.personalTechnicalQuestions = questions.filter(q => q.category === 'personalTechnical');
      },
      error: (error) => console.error('Error loading questions:', error)
    });
  }

  toggleAddQuestion(category: 'general' | 'technical' | 'personalTechnical'): void {
    this.showAddQuestion[category] = !this.showAddQuestion[category];
  }

  addQuestion(category: 'general' | 'technical' | 'personalTechnical'): void {
    const questionToAdd = this.newQuestion[category].trim();
    if (questionToAdd) {
      const newQuestion: Question = { category, question: questionToAdd };

      this.http.post<Question>(this.apiUrl, newQuestion).subscribe({
        next: (addedQuestion) => {
          if (category === 'general') {
            this.generalQuestions.push(addedQuestion);
          } else if (category === 'technical') {
            this.technicalQuestions.push(addedQuestion);
          } else if (category === 'personalTechnical') {
            this.personalTechnicalQuestions.push(addedQuestion);
          }
          this.newQuestion[category] = '';
          this.showAddQuestion[category] = false;
        },
        error: (error) => console.error('Error saving question:', error)
      });
    }
  }
}
