import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      this.user = await this.userService.getMyProfile().toPromise();
    } catch (err) {
      this.router.navigateByUrl('/auth');
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('');
  }
}
