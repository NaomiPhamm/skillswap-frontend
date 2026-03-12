import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Job, JobService } from '../../services/job.service';

@Component({
  selector: 'app-my-postings',
  imports: [CommonModule, RouterLink],
  templateUrl: './my-postings.html',
  styleUrl: './my-postings.css'
})
export class MyPostings {
  jobs: Job[] = [];
  errorMessage = '';

  constructor(private readonly jobService: JobService) {}

  ngOnInit(): void {
    this.loadMyPostings();
  }

  loadMyPostings(): void {
    this.errorMessage = '';

    this.jobService.getMyPostings().subscribe({
      next: (data: Job[]) => {
        this.jobs = data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.errorMessage = err.error?.error || 'Failed to load my postings';
      }
    });
  }
}