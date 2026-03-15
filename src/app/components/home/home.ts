import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Jobs } from '../jobs/jobs';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Jobs],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  constructor(private readonly authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}