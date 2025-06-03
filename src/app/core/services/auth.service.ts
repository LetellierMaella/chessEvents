import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  private uri = 'http://localhost:3000';
  private accessToken?: string;

  constructor(
    private readonly httpclient: HttpClient,
    private readonly localStorageService: LocalStorageService
  ) {
    const token = this.localStorageService.get('accessToken');
    if (token) {
      this.accessToken = token;
    }
  }
  ngOnInit(): void {
    console.log('AUTH SERVICE');
  }

  login(email: string, password: string) {
    return this.httpclient
      .post(`${this.uri}/auth/login`, {
        email,
        password,
      })
      .pipe(
        map((response: any) => {
          this.accessToken = response.access_token as string;
          this.localStorageService.save('accessToken', this.accessToken);
          return response;
        })
      );
  }

  getAccessToken() {
    return this.accessToken;
  }

  isLoggedIn(): boolean {
    return !!this.accessToken;
  }
}
