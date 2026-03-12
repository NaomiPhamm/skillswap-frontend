import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProposalService } from '../../services/proposal.service';

@Component({
  selector: 'app-my-bids',
  imports: [CommonModule, RouterLink],
  templateUrl: './my-bids.html',
  styleUrl: './my-bids.css'
})
export class MyBids {
  bids: any[] = [];
  errorMessage = '';

  constructor(private readonly proposalService: ProposalService) {}

  ngOnInit(): void {
    this.loadMyBids();
  }

  loadMyBids(): void {
    this.errorMessage = '';

    this.proposalService.getMyBids().subscribe({
      next: (data: any) => {
        this.bids = data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.errorMessage = err.error?.error || 'Failed to load my bids';
      }
    });
  }
}