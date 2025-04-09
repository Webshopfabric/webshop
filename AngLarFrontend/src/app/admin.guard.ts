import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // AuthService injektálása
  const router = inject(Router); // Router injektálása

  // Ellenőrizzük, hogy be van-e jelentkezve és admin jogosultsága van-e
  if (authService.isLoggedIn() && authService.isAdmin()) {
    return true; // Ha admin, hozzáférhet
  } else {
    router.navigate(['/login']); // Ha nem admin, átirányítjuk a bejelentkezési oldalra
    return false; // Nem engedélyezzük a hozzáférést
  }
};


