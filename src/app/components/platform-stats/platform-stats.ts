import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { PlatformService } from '../../services/platform.service';

@Component({
  selector: 'app-platform-stats',
  imports: [CommonModule],
  templateUrl: './platform-stats.html',
  styleUrl: './platform-stats.css'
})
export class PlatformStats {
  totalUsers = 0;
  activeJobs = 0;
  totalValueMoved = 0;

  errorMessage = '';

  constructor(private readonly platformService: PlatformService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.errorMessage = '';

    this.platformService.getStats().subscribe({
      next: (data: any) => {
        this.totalUsers = data.total_users || 0;
        this.activeJobs = data.active_jobs || 0;
        this.totalValueMoved = data.total_value_moved || 0;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.errorMessage = err.error?.error || 'Failed to load platform stats';
      }
    });
  }
}