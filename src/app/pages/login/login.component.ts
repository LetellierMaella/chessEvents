import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  public submitted = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  async login() {
    this.submitted = true;
    const { email, password } = this.loginForm.value;

    try {
      const response = await firstValueFrom(
        this.authService.login(email, password)
      );

      // 🔓 Décoder le token pour obtenir le rôle
      const token = response.access_token;
      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload.role;

      // ✅ Redirection conditionnelle
      if (role === 'organiser') {
        this.router.navigateByUrl('/organizer/dashboard');
      } else {
        this.router.navigateByUrl('/'); // Page d’accueil pour joueur
      }
    } catch (error) {
      alert('Login ou mot de passe invalide !');
    }
  }
}
