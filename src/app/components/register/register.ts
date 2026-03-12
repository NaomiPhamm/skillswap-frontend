import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  name = '';
  username = '';
  email = '';
  password = '';
  bio = '';
  skillsText = '';

  errorMessage = '';
  successMessage = '';
  suggestedUsername = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  submit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.suggestedUsername = '';

    const skillsArray = this.skillsText
      .split(',')
      .map(item => item.trim())
      .filter(item => item !== '');

    const data = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      bio: this.bio,
      skills: skillsArray
    };

    this.authService.register(data).subscribe({
      next: () => {
        this.successMessage = 'Register successful. Please login.';
        this.router.navigate(['/login']);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error?.error || 'Register failed';

        if (err.error?.suggested_username) {
          this.suggestedUsername = err.error.suggested_username;
        }
      }
    });
  }
}