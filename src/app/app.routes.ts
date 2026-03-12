import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Jobs } from './components/jobs/jobs';
import { JobDetails } from './components/job-details/job-details';
import { CreateJob } from './components/create-job/create-job';
import { MyPostings } from './components/my-postings/my-postings';
import { MyBids } from './components/my-bids/my-bids';
import { Profile } from './components/profile/profile';
import { UserProfile } from './components/user-profile/user-profile';
import { PlatformStats } from './components/platform-stats/platform-stats';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'jobs', component: Jobs },
  { path: 'jobs/new', component: CreateJob },
  { path: 'jobs/:id', component: JobDetails },
  { path: 'my-postings', component: MyPostings },
  { path: 'my-bids', component: MyBids },
  { path: 'profile', component: Profile },
  { path: 'users/:username', component: UserProfile },
  { path: 'platform-stats', component: PlatformStats },
  { path: '**', redirectTo: '' }
];