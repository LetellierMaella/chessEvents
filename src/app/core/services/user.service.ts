import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private uri = 'http://localhost:3000';

  constructor(private readonly http: HttpClient) {}

  getMyProfile() {
    return this.http.get(`${this.uri}/users/my-profile`);
  }

  getMyParticipations() {
    return this.http.get<any[]>(
      'http://localhost:3000/events/my-participations'
    );
  }
}
