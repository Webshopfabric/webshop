import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
constructor(private authService: AuthService, private router: Router) { }
// Áttettem a nav.ts-be ez itt most már nem kell
ngOnInit(): void {
  // Hívjuk meg a backend /api/logout végpontját
  this.authService.logout().subscribe(
    () => {
      // Sikeres kijelentkezés esetén töröljük a tokent a localStorage-ból
      localStorage.removeItem('authToken');
      console.log('Sikeresen kijelentkezett!');
      alert('Sikeresen kijelentkezett!');
      this.router.navigate(['/login']); // Átirányítás a bejelentkezési oldalra
    },
    (error) => {
      console.error('Hiba történt a kijelentkezés során:', error);
      alert('Hiba történt a kijelentkezés során!');
    }
  );
}
}
