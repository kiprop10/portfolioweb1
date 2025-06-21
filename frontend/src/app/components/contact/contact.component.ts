import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [MessageService] // or provide it app-wide if reused often
})
export class ContactComponent {
  message: string = '';
  messageSent: boolean = false;
  error: string = '';

  constructor(private messageService: MessageService) {}

  sendMessage() {
    const trimmedMessage = this.message.trim();
    if (!trimmedMessage) return;

    this.messageService.sendMessage(trimmedMessage).subscribe({
      next: () => {
        this.messageSent = true;
        this.message = '';
        setTimeout(() => this.messageSent = false, 3000);
      },
      error: () => {
        this.error = 'Failed to send message';
        setTimeout(() => this.error = '', 3000);
      }
    });
  }
}