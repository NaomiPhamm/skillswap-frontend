import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Jobs } from './components/jobs/jobs';
import { JobDetailsComponent } from './components/job-details/job-details';
import { CreateJob } from './components/create-job/create-job';
import { MyPostings } from './components/my-postings/my-postings';
import { MyBids } from './components/my-bids/my-bids';
import { Profile } from './components/profile/profile';
import { UserProfile } from './components/user-profile/user-profile';
import { PlatformStats } from './components/platform-stats/platform-stats';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login, canActivate: [guestGuard] },
  { path: 'register', component: Register, canActivate: [guestGuard] },
  { path: 'jobs', component: Jobs, canActivate: [authGuard] },
  { path: 'jobs/new', component: CreateJob, canActivate: [authGuard] },
  { path: 'jobs/:id', component: JobDetailsComponent, canActivate: [authGuard] },
  { path: 'my-postings', component: MyPostings, canActivate: [authGuard] },
  { path: 'my-bids', component: MyBids, canActivate: [authGuard] },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  { path: 'users/:username', component: UserProfile },
  { path: 'platform-stats', component: PlatformStats },
  { path: '**', redirectTo: '' }
];