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
  contact: string = '';
  message: string = '';
  messageSent: boolean = false;
  error: string = '';

  constructor(private http: HttpClient) {}

  sendMessage() {
    const trimmedContact = this.contact.trim();
    const trimmedMessage = this.message.trim();
    if (!trimmedContact || !trimmedMessage) return;

    this.http.post(`${environment.apiUrl}/api/messages/send`, { contact: trimmedContact, content: trimmedMessage }).subscribe({
      next: () => {
        this.messageSent = true;
        this.contact = '';
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