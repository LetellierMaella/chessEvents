import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any;
  tournaments: any[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      this.user = await this.userService.getMyProfile().toPromise();

      if (this.user?.role === 'user') {
        this.tournaments =
          (await this.userService.getMyParticipations().toPromise()) ?? [];
      } else {
        this.tournaments = [];
      }
    } catch (err) {
      this.router.navigateByUrl('/auth');
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('');
  }

  goToEvent(eventId: number) {
    this.router.navigate(['/events', eventId]);
  }
}
