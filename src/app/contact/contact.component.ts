import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [NavbarComponent, FormsModule, HttpClientModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ContactComponent {
  // Form model
  contactForm: any;

  constructor(private http: HttpClient) {}

  // Chatbot responses
  responses: { [key: string]: string } = {
    "hi": "Hello! How can I help you?",
    "how are you": "I'm just a chatbot, but thank you for asking!",
    "what is your name": "I'm just a chatbot, I don't have a name.",
    "bye": "Goodbye! Have a great day!",
  };

  // Send message function for chatbot
  sendMessage() {
    const userInput = (document.getElementById("user-input") as HTMLInputElement).value;
    const chatBox = document.getElementById("chat-box") as HTMLDivElement;

    // Display user message
    chatBox.innerHTML += `<div class="message user-message">You: ${userInput}</div>`;

    // Get chatbot response
    const response = this.responses[userInput.toLowerCase()] || "I'm sorry, I didn't understand that.";

    // Display chatbot response
    chatBox.innerHTML += `<div class="message chatbot-message">Chatbot: ${response}</div>`;

    // Clear user input
    (document.getElementById("user-input") as HTMLInputElement).value = "";

    // Scroll to the bottom of chat box
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // Toggle the chat widget visibility
  toggleChatWidget() {
    const chatWidget = document.getElementById("chat-widget") as HTMLDivElement;
    chatWidget.style.display = chatWidget.style.display === "none" || chatWidget.style.display === "" ? "block" : "none";
  }

  // Handle form submission
  onSubmit(contactForm: any) {
    if (contactForm.valid) {
      const formData = contactForm.value;

      // Make HTTP POST request to server
      this.http.post('http://localhost:5000/api/contact', formData)
        .subscribe(
          response => {
            alert('Message sent successfully!');
            contactForm.reset(); // Reset the form after success
          },
          error => {
            alert('Failed to send message.');
          }
        );
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }
}
