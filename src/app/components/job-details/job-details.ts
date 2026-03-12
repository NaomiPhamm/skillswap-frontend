import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JobDetails, JobService } from '../../services/job.service';
import { ProposalService } from '../../services/proposal.service';
import { ReviewService } from '../../services/review.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-job-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './job-details.html',
  styleUrl: './job-details.css'
})
export class JobDetailsComponent {
  job: JobDetails | null = null;
  proposals: any[] = [];

  ownerReviews: any[] = [];
  freelancerReviews: any[] = [];

  errorMessage = '';
  successMessage = '';

  proposalPrice = '';
  proposalMessage = '';

  canViewProposals = false;

  currentUsername = '';
  reviewTargetId = '';
  reviewTargetUsername = '';
  reviewRating = '';
  reviewComment = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly jobService: JobService,
    private readonly proposalService: ProposalService,
    private readonly reviewService: ReviewService,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.errorMessage = 'Invalid job id';
      return;
    }

    this.loadCurrentUser(id);
  }

  loadCurrentUser(jobId: string): void {
    this.userService.getMe().subscribe({
      next: (data: any) => {
        this.currentUsername = data.username || '';
        this.loadJobDetails(jobId);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.loadJobDetails(jobId);
      }
    });
  }

  loadJobDetails(id: string): void {
    this.jobService.getJobById(id).subscribe({
      next: (data: JobDetails) => {
        this.job = data;
        this.loadProposals();
        this.setReviewTargetAutomatically();
        this.loadOwnerReviews();
        this.loadFreelancerReviews();
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error?.error || 'Failed to load job details';
      }
    });
  }

  setReviewTargetAutomatically(): void {
    if (!this.job) {
      return;
    }

    const ownerUsername = this.job.owner?.username || this.job.owner?.name || '';
    const freelancerUsername = this.job.freelancer?.username || this.job.freelancer?.name || '';

    if (this.currentUsername === ownerUsername && this.job.freelancer) {
      this.reviewTargetId = this.job.freelancer.id || this.job.freelancer._id || '';
      this.reviewTargetUsername = freelancerUsername;
    } else if (this.currentUsername === freelancerUsername && this.job.owner) {
      this.reviewTargetId = this.job.owner.id || this.job.owner._id || '';
      this.reviewTargetUsername = ownerUsername;
    } else {
      this.reviewTargetId = '';
      this.reviewTargetUsername = '';
    }
  }

  loadProposals(): void {
    if (!this.job) {
      return;
    }

    this.proposalService.getJobProposals(this.job.id).subscribe({
      next: (data: any) => {
        this.proposals = data;
        this.canViewProposals = true;
      },
      error: () => {
        this.canViewProposals = false;
        this.proposals = [];
      }
    });
  }

  loadOwnerReviews(): void {
    if (!this.job || !this.job.owner) {
      this.ownerReviews = [];
      return;
    }

    const ownerId = this.job.owner.id || this.job.owner._id;

    if (!ownerId) {
      this.ownerReviews = [];
      return;
    }

    this.reviewService.getUserReviews(ownerId).subscribe({
      next: (data: any) => {
        this.ownerReviews = Array.isArray(data) ? data : [];
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.ownerReviews = [];
      }
    });
  }

  loadFreelancerReviews(): void {
    if (!this.job || !this.job.freelancer) {
      this.freelancerReviews = [];
      return;
    }

    const freelancerId = this.job.freelancer.id || this.job.freelancer._id;

    if (!freelancerId) {
      this.freelancerReviews = [];
      return;
    }

    this.reviewService.getUserReviews(freelancerId).subscribe({
      next: (data: any) => {
        this.freelancerReviews = Array.isArray(data) ? data : [];
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.freelancerReviews = [];
      }
    });
  }

  submitProposal(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.job) {
      this.errorMessage = 'Job not found';
      return;
    }

    if (!this.proposalPrice || !this.proposalMessage) {
      this.errorMessage = 'Price and message are required';
      return;
    }

    this.proposalService.submitProposal(
      this.job.id,
      Number(this.proposalPrice),
      this.proposalMessage
    ).subscribe({
      next: () => {
        this.successMessage = 'Proposal submitted successfully';
        this.proposalPrice = '';
        this.proposalMessage = '';
        this.loadProposals();
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error?.error || 'Failed to submit proposal';
      }
    });
  }

  acceptProposal(proposalId: string): void {
    this.errorMessage = '';
    this.successMessage = '';

    this.proposalService.acceptProposal(proposalId).subscribe({
      next: () => {
        this.successMessage = 'Proposal accepted successfully';

        if (this.job) {
          this.loadJobDetails(this.job.id);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error?.error || 'Failed to accept proposal';
      }
    });
  }

  completeJob(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.job) {
      return;
    }

    this.jobService.completeJob(this.job.id).subscribe({
      next: () => {
        this.successMessage = 'Job completed successfully';
        this.loadJobDetails(this.job!.id);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error?.error || 'Failed to complete job';
      }
    });
  }

  submitReview(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.job) {
      return;
    }

    if (!this.reviewTargetId || !this.reviewRating) {
      this.errorMessage = 'Review target and rating are required';
      return;
    }

    this.reviewService.submitReview(
      this.job.id,
      this.reviewTargetId,
      Number(this.reviewRating),
      this.reviewComment
    ).subscribe({
      next: () => {
        this.successMessage = 'Review submitted successfully';
        this.reviewRating = '';
        this.reviewComment = '';
        this.loadOwnerReviews();
        this.loadFreelancerReviews();
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error?.error || 'Failed to submit review';
      }
    });
  }
}