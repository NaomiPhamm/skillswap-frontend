import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  user: any = null;
  errorMessage = '';

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.errorMessage = '';

    this.userService.getMe().subscribe({
      next: (data: any) => {
        this.user = data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.errorMessage = err.error?.error || 'Failed to load profile';
      }
    });
  }

  getSkillsText(): string {
    if (!this.user || !this.user.skills) {
      return 'No skills listed';
    }

    if (Array.isArray(this.user.skills)) {
      return this.user.skills.join(', ');
    }

    return this.user.skills;
  }
}