<h2>Job Details</h2>

<p style="color: red;">{{ errorMessage }}</p>
<p style="color: green;">{{ successMessage }}</p>

@if (job) {
  <h3>{{ job.title }}</h3>
  <p>{{ job.description }}</p>
  <p><strong>Budget:</strong> {{ job.budget }}</p>
  <p><strong>Category:</strong> {{ job.category }}</p>
  <p><strong>Status:</strong> {{ job.status }}</p>

  @if (job.owner) {
    <p><strong>Owner:</strong> {{ job.owner.username || job.owner.name }}</p>
  }

  @if (job.freelancer) {
    <p><strong>Freelancer:</strong> {{ job.freelancer.username || job.freelancer.name }}</p>
  }

  <hr>

  <h3>Submit Proposal</h3>

  <div>
    <label>Price</label>
    <input
      type="text"
      [(ngModel)]="proposalPrice"
      name="proposalPrice"
      placeholder="Enter your price"
    >
  </div>

  <br>

  <div>
    <label>Message</label>
    <textarea
      [(ngModel)]="proposalMessage"
      name="proposalMessage"
      placeholder="Write your message"
    ></textarea>
  </div>

  <br>

  <button (click)="submitProposal()">Submit Proposal</button>

  @if (canViewProposals) {
    <hr>

    <h3>Proposals</h3>

    <div *ngFor="let proposal of proposals">
      <p><strong>Proposal ID:</strong> {{ proposal.id }}</p>
      <p><strong>Price:</strong> {{ proposal.price }}</p>
      <p><strong>Status:</strong> {{ proposal.status }}</p>
      <p><strong>Message:</strong> {{ proposal.message || proposal.cover_letter }}</p>

      <button (click)="acceptProposal(proposal.id)">Accept Proposal</button>

      <hr>
    </div>
  }

  <hr>

  <h3>Complete Job</h3>
  <button (click)="completeJob()">Mark Job as Completed</button>

  <hr>

  <h3>Submit Review</h3>

  <div>
    <label>Target User ID</label>
    <input
      type="text"
      [(ngModel)]="reviewTargetId"
      name="reviewTargetId"
      placeholder="Enter target user id"
    >
  </div>

  <br>

  <div>
    <label>Rating</label>
    <input
      type="text"
      [(ngModel)]="reviewRating"
      name="reviewRating"
      placeholder="1 to 5"
    >
  </div>

  <br>

  <div>
    <label>Comment</label>
    <textarea
      [(ngModel)]="reviewComment"
      name="reviewComment"
      placeholder="Write your review"
    ></textarea>
  </div>

  <br>

  <button (click)="submitReview()">Submit Review</button>
}