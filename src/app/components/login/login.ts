import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AuthService, LoginResponse } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  submit(): void {
    this.errorMessage = '';

    console.log('email =', this.email);
    console.log('password =', this.password);

    this.authService.login(this.email, this.password).subscribe({
      next: (res: LoginResponse) => {
        console.log('login success', res);
        this.authService.setToken(res.token);
        this.router.navigate(['/jobs']);
      },
      error: (err: HttpErrorResponse) => {
        console.log('login error', err);
        this.errorMessage = err.error?.error || 'Login failed';
      }
    });
  }
}