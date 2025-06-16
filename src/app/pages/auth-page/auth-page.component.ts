import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  standalone: true,
  imports: [LoginComponent, RegisterComponent, CommonModule],
})
export class AuthPageComponent {
  showLogin = true;

  switchMode() {
    this.showLogin = !this.showLogin;
  }
}
