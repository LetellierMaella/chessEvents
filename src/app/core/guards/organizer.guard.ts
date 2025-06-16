import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const OrganizerGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getAccessToken();

  if (!token) {
    router.navigateByUrl('/auth');
    return false;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.role === 'organiser') {
      return true;
    }
  } catch {}

  router.navigateByUrl('/auth');
  return false;
};
