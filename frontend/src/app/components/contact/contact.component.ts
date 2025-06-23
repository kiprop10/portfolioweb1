import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  message: string = '';
  messageSent: boolean = false;
  error: string = '';

  constructor(private http: HttpClient) {}

  sendMessage() {
    const trimmedMessage = this.message.trim();
    if (!trimmedMessage) return;

    this.http.post(`${environment.apiUrl}/api/messages/send`, { content: trimmedMessage }).subscribe({
      next: () => {
        this.messageSent = true;
        this.message = '';
        setTimeout(() => (this.messageSent = false), 3000);
      },
      error: () => {
        this.error = 'Failed to send message';
        setTimeout(() => (this.error = ''), 3000);
      }
    });
  }
}