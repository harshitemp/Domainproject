import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

export interface Question {
  category: string;
  question: string;
}

type QuestionCategory = 'general' | 'technical' | 'personalTechnical'; // Define valid categories

@Component({
  selector: 'app-footer1',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './footer1.component.html',
  styleUrls: ['./footer1.component.css'],
})
export class Footer1Component implements OnInit {
  generalQuestions: Question[] = [];
  technicalQuestions: Question[] = [];
  personalTechnicalQuestions: Question[] = [];

  showAddQuestion: { [key in QuestionCategory]: boolean } = {
    general: false,
    technical: false,
    personalTechnical: false,
  };

  newQuestion: { [key in QuestionCategory]: string } = {
    general: '',
    technical: '',
    personalTechnical: '',
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions() {
    this.http.get<Question[]>('http://localhost:5000/api/questions').subscribe(
      (data) => {
        this.generalQuestions = data.filter((q) => q.category === 'general');
        this.technicalQuestions = data.filter((q) => q.category === 'technical');
        this.personalTechnicalQuestions = data.filter(
          (q) => q.category === 'personalTechnical'
        );
      },
      (error) => {
        console.error('Error fetching questions:', error);
      }
    );
  }

  toggleAddQuestion(category: QuestionCategory) {
    this.showAddQuestion[category] = !this.showAddQuestion[category];
  }

  addQuestion(category: QuestionCategory) {
    const questionText = this.newQuestion[category];
    if (!questionText) return;

    const question: Question = { category, question: questionText };
    this.http.post<Question>('http://localhost:5000/api/questions', question).subscribe(
      (data) => {
        // Add the new question to the appropriate list
        if (category === 'general') {
          this.generalQuestions.push(data);
        } else if (category === 'technical') {
          this.technicalQuestions.push(data);
        } else if (category === 'personalTechnical') {
          this.personalTechnicalQuestions.push(data);
        }
        this.newQuestion[category] = ''; // Reset input field
        this.showAddQuestion[category] = false; // Close the input field
      },
      (error) => {
        console.error('Error adding question:', error);
      }
    );
  }
}
