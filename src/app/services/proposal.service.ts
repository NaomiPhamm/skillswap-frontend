import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  private readonly BASE_URL = 'https://stingray-app-wxhhn.ondigitalocean.app';

  constructor(private readonly http: HttpClient) {}

  submitProposal(jobId: string, price: number, message: string) {
    return this.http.post(`${this.BASE_URL}/jobs/${jobId}/proposals`, {
      price: price,
      message: message
    });
  }

  getMyBids() {
    return this.http.get(`${this.BASE_URL}/proposals/my-bids`);
  }

  getJobProposals(jobId: string) {
    return this.http.get(`${this.BASE_URL}/jobs/${jobId}/proposals`);
  }

  acceptProposal(proposalId: string) {
    return this.http.patch(`${this.BASE_URL}/proposals/${proposalId}/accept`, {});
  }
}