import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private apiUrl = 'http://localhost:3000/api/messages/send';

  constructor(private http: HttpClient) {}

  sendMessage(content: string): Observable<any> {
    return this.http.post(this.apiUrl, { content });
  }
}
