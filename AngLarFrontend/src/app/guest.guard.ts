import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    router.navigate(['/products']); // Ha be van jelentkezve, átirányítjuk
    return false;
  }
  return true; // Ha nincs bejelentkezve, engedélyezzük az útvonal elérését
};
