import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EventListComponent } from './pages/events/event-list/event-list.component';
import { EventDetailsComponent } from './pages/events/event-details/event-details.component';
import { JoinEventComponent } from './pages/events/join-event/join-event.component';
import { DashboardComponent } from './pages/organizer/dashboard/dashboard.component';
import { EventCrudComponent } from './pages/organizer/event-crud/event-crud.component';
import { PlayerListComponent } from './pages/organizer/player-list/player-list.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { OrganizerGuard } from './core/guards/organizer.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'auth',
    component: AuthPageComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },

  // Events (everyone)
  { path: 'events', component: EventListComponent },
  { path: 'events/:id', component: EventDetailsComponent },
  { path: 'events/:id/join', component: JoinEventComponent },

  // Organizer (private)
  {
    path: 'organizer/dashboard',
    component: DashboardComponent,
    canActivate: [OrganizerGuard],
  },
  {
    path: 'organizer/event-crud',
    component: EventCrudComponent,
    canActivate: [OrganizerGuard],
  },
  {
    path: 'organizer/events/:id/players',
    component: PlayerListComponent,
    canActivate: [OrganizerGuard],
  },
];
