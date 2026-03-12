import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-create-job',
  imports: [FormsModule],
  templateUrl: './create-job.html',
  styleUrl: './create-job.css'
})
export class CreateJob {
  title = '';
  description = '';
  budget = '';
  category = '';

  errorMessage = '';
  successMessage = '';

  constructor(
    private readonly jobService: JobService,
    private readonly router: Router
  ) {}

  submit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.title || !this.description || !this.budget || !this.category) {
      this.errorMessage = 'All fields are required';
      return;
    }

    this.jobService.createJob(
      this.title,
      this.description,
      Number(this.budget),
      this.category
    ).subscribe({
      next: () => {
        this.successMessage = 'Job created successfully';
        this.router.navigate(['/my-postings']);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.errorMessage = err.error?.error || 'Failed to create job';
      }
    });
  }
}