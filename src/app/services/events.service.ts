import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Observable } from 'rxjs';
import { ChessEvent } from '../models/chess-event.model';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private uri: string = 'http://localhost:3000/events';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService
  ) {}

  getAll() {
    return this.httpClient.get(`${this.uri}`);
  }

  getById(id: number): Observable<ChessEvent> {
    return this.httpClient.get<ChessEvent>(`${this.uri}/${id}`);
  }

  getMyEvents() {
    return this.httpClient.get(`${this.uri}/me`);
  }

  create(data: any) {
    return this.httpClient.post(this.uri, data);
  }

  update(id: number, data: any) {
    return this.httpClient.patch(`${this.uri}/${id}`, data);
  }

  registerToEvent(eventId: number) {
    return this.httpClient.post(`${this.uri}/register`, { eventId });
  }
}
