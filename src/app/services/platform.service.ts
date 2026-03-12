import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  private readonly BASE_URL = 'https://stingray-app-wxhhn.ondigitalocean.app';

  constructor(private readonly http: HttpClient) {}

  getStats() {
    return this.http.get(`${this.BASE_URL}/platform/stats`);
  }
}