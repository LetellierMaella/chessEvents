import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      birthday: new FormControl('', Validators.required),
    });
  }

  async register() {
    this.submitted = true;
    if (this.registerForm.invalid) return;

    const formValue = this.registerForm.value;

    const data = {
      ...formValue,
      birthday: formValue.birthday,
    };

    console.log(data);

    try {
      await this.authService.register(data).toPromise();
      this.router.navigateByUrl('');
    } catch (err: any) {
      const message = err.error?.message || err.message || '';

      if (message.toLowerCase().includes('email already used')) {
        alert('Cette adresse e-mail est déjà utilisée.');
      } else if (err.status === 400) {
        alert('Certains champs sont invalides.');
      } else {
        alert("Une erreur est survenue lors de l'inscription.");
        console.error(err);
      }
    }
  }
}
