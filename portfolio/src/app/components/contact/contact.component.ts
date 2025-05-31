import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports:[FormsModule, CommonModule,],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  message: string = '';
  messageSent: boolean = false;
  
  sendMessage() {
    this.messageSent = true;
    this.message = '';
    setTimeout(() => this.messageSent = false, 3000);
  }
}