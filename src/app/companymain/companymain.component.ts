import { Component } from '@angular/core';

@Component({
  selector: 'app-companymain',
  standalone: true,
  imports: [],
  templateUrl: './companymain.component.html',
  styleUrl: './companymain.component.css'
})
export class CompanymainComponent {
  onMessagesClick() {
    alert('You have clicked Messages');
  }

  onLogoutClick() {
    alert('You have clicked Log Out');
  }

}