import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private uri: string = 'http://localhost:3000/events';

  constructor(private readonly httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get(`${this.uri}`);
  }
}
