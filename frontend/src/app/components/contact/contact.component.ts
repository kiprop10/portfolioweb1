import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface Message {
  _id?: string;
  name: string;
  contact: string;
  content: string;
  createdAt?: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  name: string = '';
  contact: string = '';
  message: string = '';
  messageSent: boolean = false;
  error: string = '';

  constructor(private http: HttpClient) {}

  sendMessage() {
    const trimmedName = this.name.trim();
    const trimmedContact = this.contact.trim();
    const trimmedMessage = this.message.trim();
    if (!trimmedName || !trimmedContact || !trimmedMessage) return;

    this.http.post(`${environment.apiUrl}/api/messages/send`, { name: trimmedName, contact: trimmedContact, content: trimmedMessage }).subscribe({
      next: () => {
        this.messageSent = true;
        this.name = '';
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