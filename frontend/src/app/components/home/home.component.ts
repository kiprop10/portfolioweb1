import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showModal = false;
  cvPassword = '';
  cvError = '';
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  openPasswordModal() {
    this.showModal = true;
    this.cvPassword = '';
    this.cvError = '';
  }

  closeModal() {
    this.showModal = false;
    this.cvPassword = '';
    this.cvError = '';
  }

  async submitPassword() {
    this.cvError = '';
    try {
      const res: any = await this.http.post<{ token: string }>(
        `${this.apiUrl}/cv/password-check`,
        { password: this.cvPassword }
      ).toPromise();

      const token = res.token;
      const downloadRes = await fetch(`${this.apiUrl}/cv/download?token=${token}`);
      if (!downloadRes.ok) {
        this.cvError = 'Download failed.';
        return;
      }

      const blob = await downloadRes.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'KipropMutai-CV.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      this.closeModal();
    } catch (e: any) {
      this.cvError = e?.error?.error || 'Incorrect password or network error.';
    }
  }
}
