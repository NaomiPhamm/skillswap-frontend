import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { JobService, Job } from '../../services/job.service';

@Component({
  selector: 'app-jobs',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './jobs.html',
  styleUrl: './jobs.css'
})
export class Jobs {
  jobs: Job[] = [];
  category = '';
  minBudget = '';
  errorMessage = '';

  constructor(private readonly jobService: JobService) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.errorMessage = '';

    this.jobService.searchJobs(this.category, this.minBudget).subscribe({
      next: (data: Job[]) => {
        this.jobs = data;
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error?.error || 'Failed to load jobs';
      }
    });
  }
}