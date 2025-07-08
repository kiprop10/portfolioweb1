import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { RouterLink } from '@angular/router';

declare var bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, FormsModule, HttpClientModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showModal = false;
  cvPassword = '';
  cvError = '';
  cvToastMessage = '';
  apiUrl = environment.apiUrl;

  @ViewChild('cvToast') cvToastRef!: ElementRef;
  private toastInstance: any;

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
        this.showErrorToast('❌ Download failed.');
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

      this.cvToastMessage = '✅ Your CV is downloading...';
      setTimeout(() => this.showToast(), 300);
    } catch (e: any) {
      const message = e?.error?.error || 'Incorrect password or network error.';
      this.cvError = message;
      this.showErrorToast(`❌ ${message}`);
    }
  }

  showToast() {
    if (!this.toastInstance && this.cvToastRef) {
      const toastEl = this.cvToastRef.nativeElement;
      this.toastInstance = new bootstrap.Toast(toastEl, { delay: 4000 });
    }
    this.toastInstance?.show();
  }

  hideToast() {
    this.toastInstance?.hide();
  }

  showErrorToast(msg: string) {
    this.cvToastMessage = msg;
    const toastEl = this.cvToastRef.nativeElement;
    toastEl.classList.remove('bg-success');
    toastEl.classList.add('bg-danger');
    this.showToast();
    setTimeout(() => {
      toastEl.classList.remove('bg-danger');
      toastEl.classList.add('bg-success');
    }, 5000);
  }
}
