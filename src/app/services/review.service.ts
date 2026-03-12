import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private readonly BASE_URL = 'https://stingray-app-wxhhn.ondigitalocean.app';

  constructor(private readonly http: HttpClient) {}

  submitReview(jobId: string, targetId: string, rating: number, comment: string) {
    return this.http.post(`${this.BASE_URL}/jobs/${jobId}/reviews`, {
      target_id: targetId,
      rating: rating,
      comment: comment
    });
  }

  getUserReviews(userId: string) {
    return this.http.get(`${this.BASE_URL}/reviews/user/${userId}`);
  }
}