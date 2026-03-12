import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Job {
  id: string;
  title: string;
  description: string;
  budget: number;
  category: string;
  status: string;
}

export interface JobDetails {
  id: string;
  title: string;
  description: string;
  budget: number;
  category: string;
  status: string;
  owner?: any;
  freelancer?: any;
}

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private readonly BASE_URL = 'https://stingray-app-wxhhn.ondigitalocean.app';

  constructor(private readonly http: HttpClient) {}

  searchJobs(category: string = '', minBudget: string = ''): Observable<Job[]> {
    const body: any = {
      status: 'open'
    };

    if (category.trim() !== '') {
      body.category = category.trim();
    }

    if (minBudget.trim() !== '') {
      body.min_budget = Number(minBudget);
    }

    return this.http.post<Job[]>(`${this.BASE_URL}/jobs/search`, body);
  }

  getJobById(id: string): Observable<JobDetails> {
  return this.http.get<JobDetails>(`${this.BASE_URL}/jobs/${id}`);
}
getMyPostings() {
  return this.http.get<Job[]>(`${this.BASE_URL}/jobs/my-postings`);
}
createJob(title: string, description: string, budget: number, category: string) {
  return this.http.post(`${this.BASE_URL}/jobs`, {
    title: title,
    description: description,
    budget: budget,
    category: category
  });
}
completeJob(jobId: string) {
  return this.http.patch(`${this.BASE_URL}/jobs/${jobId}/complete`, {});
}
}